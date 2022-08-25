---
title: Nginx 之静态文件配置及 alias 使用
date: 2018-07-09
description: Nginx 之静态文件配置， 以及 root & alias 使用
permalink: /:regular
---

# Nginx 之静态文件配置及 alias 使用

<!--# 简介
Nginx 之静态文件配置， 以及 root & alias 使用-->

## 目录

[[toc]]

## 简介

Nginx 静态文件规则配置及 alias 的使用

## 配置详解

- `autoindex` 用于自动生成目录列表
- `root` 既可以用在 `location` 中，也可以用在外面
- `alias` 只能用在 `location` 结构中

```conf
location /i/ {
    root /data/w3/images;
}
```
使用 `root` 时，`/i/top.gif` 会解析到 `/data/w3/images/i/top.gif`，root 末尾的 `/`，可有可无

```conf
location /i/ {
    alias /data/w3/images/;
}
```
使用 `alias` 时，`/i/top.gif` 会解析到 `/data/w3/images/top.gif`，alias 末尾的 `/`，必须添加

## 示例

```conf
# static.demo.com
server {
    listen       80;
    server_name  static.demo.com;
    # client_max_body_size 20m;

    # upload dir index
    location /upload {
        alias /home/data/files/;
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
        charset utf-8,gbk;
    }

    # media file optimize
    location ~ ^/upload/(.+\.(mp3|mp4))$ {
        alias /home/data/files/$1;
        sendfile           on;
        sendfile_max_chunk 1m;
        tcp_nopush         on;
    }

    # config for gzip
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 4;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_types text/plain application/javascript application/x-javascript
text/css application/xml text/javascript image/jpeg image/gif image/png;
    gzip_vary on;
}
```

## Reference

- [Nginx docs cn](http://www.nginx.cn/doc/)
- [Nginx docs en](http://nginx.org/en/docs/)
- [alias - Nginx docs](http://nginx.org/en/docs/http/ngx_http_core_module.html#alias)
- [autoindex - Nginx docs](http://nginx.org/en/docs/http/ngx_http_autoindex_module.html)
- [Nginx location 配置参考 - 1037号菜鸟](https://www.hujiangtao.cn/post/Nginx/2018-03-24-Nginx%E4%B9%8Blocation%E9%85%8D%E7%BD%AE.html#%E8%AF%AD%E6%B3%95%E8%A7%84%E5%88%99%EF%BC%9A)
