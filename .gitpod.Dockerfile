FROM gitpod/workspace-full

USER gitpod

RUN bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh && \
    sdk install java 17.0.3-ms && \
    sdk default java 17.0.3-ms"

RUN bash -c "curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash"

RUN bash -c "echo 'alias lg=lazygit' >> .bashrc"
RUN bash -c "echo 'alias ld=lazydocker' >> .bashrc"

RUN bash -c "npm install --global @angular/cli"