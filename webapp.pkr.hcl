packer {
  required_plugins {
    amazon = {
      version = ">= 0.1.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-west-2"
}

variable "source_ami" {
  type    = string
  default = "ami-0b6edd8449255b799"
}
variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-06ccf8aab10478919"
}

source "amazon-ebs" "my-ami" {
  # profile         = "dev"
  ami_name        = "csye6225_debianami-${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "ami from csye6225"
  region          = "${var.aws_region}"

  ami_regions = [
    "us-west-2",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  launch_block_device_mappings {
    device_name           = "/dev/xvda"
    delete_on_termination = true
    volume_size           = 8
    volume_type           = "gp2"
  }


}


build {
  sources = ["source.amazon-ebs.my-ami"]


  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1",
    ]

    inline = [
      "sudo apt-get update",
      "sudo apt-get install mariadb-server -y",
      "sudo systemctl start mariadb",
      "sudo mysql -e \"GRANT ALL ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root1234';\"",
      "sudo apt install nodejs npm -y",
      "sudo apt install -y unzip",
    ]

  }

}


#   provisioner "shell" {
#     script = "scripts/install_application.sh" # Replace with your application installation script
#   }

#   post-processor "manifest" {
#     output = "debian-12-ami.json"
#   }

#   post-processor "ami" {
#     name = "debian-12-ami-final"
#     users = ["123456789012"] # Replace with your DEMO AWS account ID
#     launch_permissions {
#       user_ids = ["123456789012"] # Replace with your DEMO AWS account ID
#     }
#   }

