FROM python:3-alpine3.11

# Set the working directory
WORKDIR /server

COPY . /server

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose the port
EXPOSE 5000

# Run the application
CMD ["python", "server.py"]