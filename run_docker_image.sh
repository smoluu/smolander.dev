docker run -d \
  --name smolander-dev \
  --restart always \
  -p 82:80 \
  --network custom \
  smoluu/smolander.dev
