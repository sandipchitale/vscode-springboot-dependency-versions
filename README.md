# vscode-springboot-dependency-versions README

VSCode extension to show Springboot dependency version properties and values and actual GAVs of dependencies in a Gradle based Springboot project. This is helpful when you want to override the managed versions (in your gradle.properties file) with a later version to deal with vulnerabilities found by scanning tools. This shows managed dependency versions based on the actual Springboot version in your project and you do not have to go hunting for these [here](https://docs.spring.io/spring-boot/docs/current/reference/html/dependency-versions.html#appendix.dependency-versions.properties).

## Features

|Name|Command|Description|
|-|-|-|
|Springboot dependency versions|vscode-springboot-dependency-versions.show|Show Springboot dependency version properties and values in in a Gradle based Springboot project.|

The command shows the managed version properties and values and the id and version of all managed dependencies of your project.

### Sample output

```
> gradlew.bat springbootDependencies
-

> Task :springbootDependencies

Managed dependency version properties and versions


Version Property                         |                   Version

:
commons-lang3.version                    |                      3.11
:
jackson-bom.version                      |                    2.11.3
:
log4j2.version                           |                    2.13.3
logback.version                          |                     1.2.3
:
spring-framework.version                 |                     5.3.1
:
tomcat.version                           |                    9.0.39
:

Managed dependency gid:aids and actual versions.


Group Id:Artifact Id                                                                  |            Actual Version

:
org.apache.tomcat.embed:tomcat-embed-core                                             |                    9.0.60
org.apache.tomcat.embed:tomcat-embed-el                                               |                    9.0.60
org.apache.tomcat.embed:tomcat-embed-jasper                                           |                    9.0.60
org.apache.tomcat.embed:tomcat-embed-websocket                                        |                    9.0.60
org.apache.tomcat:tomcat-annotations-api                                              |                    9.0.60
:
org.springframework:spring-core                                                       |                    5.3.18
:

BUILD SUCCESSFUL in 3s
1 actionable task: 1 executed
```
## Known Issues

None.

## Release Notes

### 1.0.0

Initial release.
