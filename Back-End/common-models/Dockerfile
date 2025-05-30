# Use a Maven image that includes JDK, as we'll run mvn spring-boot:run
FROM maven:3.9-eclipse-temurin-21-alpine

# Set a working directory in the container
WORKDIR /app

# Copy the pom.xml file first for better layer caching
COPY pom.xml .

# Copy the source code
COPY src ./src
# (Optional) Copy pom.xml first to leverage Docker cache for dependencies
# if you plan to run 'mvn dependency:go-offline' or similar inside.
# For pure spring-boot:run with mounted .m2, this might not be strictly necessary.
# COPY pom.xml .
# If you have a .mvn directory for wrapper or extensions
# COPY .mvn .mvn
# COPY pom.xml ./
# RUN mvn dependency:go-offline -B # -B for batch mode

# Expose the application port and the LiveReload port (default 35729)
EXPOSE 9090

# Command to run the application with mvn spring-boot:run
# This command will be executed when the container starts.
# The source code will be mounted via docker-compose.
# The -Dspring-boot.run.jvmArguments ensures devtools properties are passed to the forked JVM.
CMD ["mvn", "package", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-Dspring.devtools.restart.enabled=true -Dspring.devtools.livereload.enabled=true -Dspring.devtools.remote.secret=yoursecret"]