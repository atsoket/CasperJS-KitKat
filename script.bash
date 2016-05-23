#!/bin/bash
START=1
END="$(wc -l contas | awk '{print $1;}')"
for (( c=$START; c<$END; c++))
do
    UN="$(sed -n "$c"p contas | awk '{print $1;}')"
    PW="$(sed -n "$c"p contas | awk '{print $2;}')"
    casperjs main.js $UN $PW
done
