# Terraform & cdktf & Azure CLI
FROM node:24-trixie-slim AS cdktf-az
RUN apt-get update && apt-get install -y lsb-release curl gnupg python3 make g++
RUN curl -s https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" >/etc/apt/sources.list.d/hashicorp.list
RUN apt-get update && apt-get install -y terraform
RUN npm install -g cdktf-cli@latest
RUN curl -SL https://aka.ms/InstallAzureCLIDeb | bash

# npm
FROM node:24-trixie-slim AS npm
WORKDIR /npm
COPY ./package.json /npm/package.json
COPY ./package-lock.json /npm/package-lock.json
RUN npm install

# Final image
FROM node:24-trixie-slim
COPY --from=cdktf-az /usr/bin/terraform /usr/bin/terraform
COPY --from=cdktf-az /usr/local/lib/node_modules/cdktf-cli /usr/local/lib/node_modules/cdktf-cli
COPY --from=cdktf-az /usr/bin/az /usr/bin/az
COPY --from=cdktf-az /opt/az /opt/az
ENV LANG=ja_JP.UTF-8 LANGUAGE=ja_JP:ja LC_ALL=ja_JP.UTF-8
RUN apt-get update && apt-get install -y git vim locales \
 && apt-get clean && rm -rf /var/lib/apt/lists/* \
 && ln -snf /usr/local/lib/node_modules/cdktf-cli/bundle/bin/cdktf /usr/local/bin/cdktf \
 && ln -snf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
 && echo Asia/Tokyo >/etc/timezone \
 && sed -i '/ja_JP.UTF-8/s/^# //g' /etc/locale.gen \
 && locale-gen ja_JP.UTF-8 \
 && update-locale LANG=ja_JP.UTF-8 LANGUAGE=ja_JP:ja LC_ALL=ja_JP.UTF-8
