# Use a base image with Java and Maven pre-installed
FROM maven:3.8-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app/backend

# Copy the Maven project file and download dependencies
COPY ./pom.xml .

# Download dependencies
RUN mvn -e -B dependency:resolve

# Copy the application source code
COPY ./src ./src

# Expose port 8080
EXPOSE 8080

# Define the command to run the application using spring-boot-devtools
CMD ["mvn", "spring-boot:run"]

