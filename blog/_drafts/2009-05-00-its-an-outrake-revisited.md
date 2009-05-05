
task :fileutils1 do
  touch "poop"
  mkdir "hihi"
end

task :fileutils2 do
  rm "poop"
  rmdir "hihi"
end