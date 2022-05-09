sed '6 c\
  <base href="/app/">\' src/index.html  > temp_file.html;

cat temp_file.html > src/index.html;
