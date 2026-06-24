-- 데이터베이스 생성 및 사용자 설정
-- 이 파일은 docker/MySQL 초기 설정 시 한 번만 실행

-- 기존 데이터베이스 제거 (선택사항)
-- DROP DATABASE IF EXISTS kweb_db;

-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS kweb_db;

-- 사용자 생성 및 권한 설정
-- 사용자가 이미 존재하면 권한만 갱신
GRANT ALL PRIVILEGES ON kweb_db.* TO 'kweb'@'%' IDENTIFIED BY '1q2w3e4r';
FLUSH PRIVILEGES;

USE kweb_db;
