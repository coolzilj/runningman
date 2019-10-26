#!/usr/bin/env ruby

# Author: Jin Liu
# Usage:
# 1. cd 到视频保存的目标目录
# 2. path_to_download.rb 2014   # 全部下载
# 2. path_to_download.rb 2014 3 # 下载 3 个

require 'json'

year = ARGV[0]
raise '缺少年份，正确使用方法: ./download.rb year [limit]' unless year

limit = ARGV[1] || 9_999_999_999
downloaded = 0

data_path = File.join(File.dirname(__FILE__), "./episodes/#{year}.json")
eps = JSON.parse(File.read(data_path))
eps.each do |ep|
  id = ep['id']
  url = ep['srcs'].first
  base_path = './'
  if File.exist?("#{base_path}#{id}.flv") || File.exist?("#{base_path}#{id}.mp4")
    puts "#{id} 已下载"
  else
    puts "#{id} 正在下载..."
    system("annie -o ./videos/ -O #{id} #{url}")
    # sleep 5
    downloaded += 1
    break if downloaded >= limit.to_i
  end
end
