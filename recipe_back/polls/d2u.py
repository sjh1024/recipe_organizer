#!/bin/bash

# Convert Windows-style line endings to Linux-style for all files in the current directory and its subdirectories
find . -type f -exec sh -c 'tr -d "\r" < "{}" > tmpfile && mv tmpfile "{}"' \;
