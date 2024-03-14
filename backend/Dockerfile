FROM openjdk:17-alpine

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} back-end.jar

ENTRYPOINT ["java", "-jar", "/back-end.jar"]
