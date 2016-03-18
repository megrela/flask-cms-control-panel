ruby.exe -v

cd .\css

call sass -v

call sass --update scss:min -f -C --style compact

call sass --watch scss:min --style compact
