# Liferay With K6 Load Test

## Ajuste de recursos para testes k6

Para aumentar os recursos do portal durante os testes de carga com **k6**, edite o arquivo correspondente ao seu sistema operacional:

- **Linux/macOS:** `bundles/tomcat/bin/setenv.sh`  
- **Windows:** `bundles\tomcat\bin\setenv.bat`

## Exemplos

### Linux/macOS (`setenv.sh`)
```sh
CATALINA_OPTS="$CATALINA_OPTS -Dfile.encoding=UTF-8 -Djava.net.preferIPv4Stack=true -Duser.timezone=GMT -Xms2560m -Xmx2560m -XX:MaxNewSize=1536m -XX:MaxMetaspaceSize=768m -XX:MetaspaceSize=768m -XX:NewSize=1536m -XX:SurvivorRatio=7"
```

### Windows (setenv.bat)
```sh
set "CATALINA_OPTS=%CATALINA_OPTS% -Dfile.encoding=UTF-8 -Djava.net.preferIPv4Stack=true -Duser.timezone=GMT -Xms8g -Xmx8g -XX:MaxNewSize=1536m -XX:MaxMetaspaceSize=768m -XX:MetaspaceSize=768m -XX:NewSize=1536m -XX:SurvivorRatio=7"
```

## Recomendações

Ajuste os valores de -Xms (heap inicial) e -Xmx (heap máximo) conforme a memória disponível no servidor.

Reinicie o Tomcat após a alteração.

### Sugestão inicial:

- 4 GB RAM → `-Xms1g` e `-Xmx1g`

- 8 GB RAM → `-Xms4g` e `-Xmx4g`

- 16 GB RAM → `-Xms8g` e `-Xmx8g`