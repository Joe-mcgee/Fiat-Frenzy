#1/bin/bash
DIR=${pwd}
SESSIONNAME=bankcoin
tmux new-session -s $SESSIONNAME \; \
	send-keys 'nvim ${DIR}' C-m \; \
	split-window -v \; \
	send-keys 'docker-compose up' C-m \; \
	split-window -h \; \

