#!/bin/sh
git config gpg.format ssh
git config gpg.ssh.defaultKeyCommand "ssh-add -L"
git config commit.gpgsign true
cdktf get
