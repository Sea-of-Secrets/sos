-- --------------------------------------------------------
-- 호스트:                          j10a710.p.ssafy.io
-- 서버 버전:                        11.3.2-MariaDB-1:11.3.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 sos.file_entity 구조 내보내기
CREATE TABLE IF NOT EXISTS `file_entity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_name_extension` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ek4mkxhdfyhc386xpfqexx1dj` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sos.file_entity:~0 rows (대략적) 내보내기

-- 테이블 sos.product 구조 내보내기
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  `modified_at` datetime(6) DEFAULT NULL,
  `grade` enum('COMMON','RARE','LEGENDARY') DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `is_sold_out` bit(1) DEFAULT b'0',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sos.product:~9 rows (대략적) 내보내기
INSERT INTO `product` (`product_id`, `created_at`, `is_deleted`, `modified_at`, `grade`, `image_name`, `image_url`, `is_sold_out`, `name`) VALUES
	(1, '2024-04-03 18:30:45.118375', b'0', '2024-04-04 01:57:44.839152', 'LEGENDARY', 'f150b925-5f5c-4fe3-9676-3b6c9e41b536.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/f150b925-5f5c-4fe3-9676-3b6c9e41b536.png', b'1', 'zuhee'),
	(2, '2024-04-03 18:30:57.763951', b'0', '2024-04-03 18:30:57.763951', 'COMMON', 'cacaa88e-267b-4bb4-b1de-b6a31c8386a8.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/cacaa88e-267b-4bb4-b1de-b6a31c8386a8.png', b'0', 'common1'),
	(3, '2024-04-03 18:31:06.192888', b'0', '2024-04-03 18:31:06.192888', 'COMMON', 'c4c4084a-b351-4df4-8939-9c45f8cff75a.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/c4c4084a-b351-4df4-8939-9c45f8cff75a.png', b'0', 'common2'),
	(4, '2024-04-03 18:31:12.622483', b'0', '2024-04-03 18:31:12.622483', 'COMMON', '282e90b9-30ec-4e26-b13a-34763e45945f.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/282e90b9-30ec-4e26-b13a-34763e45945f.png', b'0', 'common3'),
	(6, '2024-04-03 18:31:30.364612', b'0', '2024-04-04 10:32:12.173116', 'RARE', '335b8c55-b881-4fde-a7b1-4f7bd0ae96db.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/335b8c55-b881-4fde-a7b1-4f7bd0ae96db.png', b'1', 'rare2'),
	(7, '2024-04-03 18:31:39.534658', b'0', '2024-04-04 11:00:24.864910', 'RARE', 'b09645af-270c-42f7-b921-943dd2ba47d1.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/b09645af-270c-42f7-b921-943dd2ba47d1.png', b'1', 'rare3'),
	(8, '2024-04-03 18:31:53.900654', b'0', '2024-04-04 08:56:05.182021', 'LEGENDARY', '6b65ee7a-ac23-43d5-967c-76e0f42cb8b6.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/6b65ee7a-ac23-43d5-967c-76e0f42cb8b6.png', b'1', 'legendary1'),
	(9, '2024-04-03 18:32:01.515449', b'0', '2024-04-03 22:20:59.072102', 'LEGENDARY', '4f70333d-eaf1-4c68-aa31-ca0f45d624bc.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/4f70333d-eaf1-4c68-aa31-ca0f45d624bc.png', b'1', 'legendary2'),
	(10, '2024-04-03 18:32:07.962651', b'0', '2024-04-04 08:38:10.329478', 'LEGENDARY', 'f7d150f2-4790-4aa4-81c7-f288d02e8394.png', 'https://a710choi.s3.ap-northeast-2.amazonaws.com/f7d150f2-4790-4aa4-81c7-f288d02e8394.png', b'1', 'legendary3');

-- 테이블 sos.purchase 구조 내보내기
CREATE TABLE IF NOT EXISTS `purchase` (
  `created_at` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  `modified_at` datetime(6) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`product_id`,`user_id`),
  KEY `FK335wmi4gkn67nx7ml3s8sh51m` (`user_id`),
  CONSTRAINT `FK335wmi4gkn67nx7ml3s8sh51m` FOREIGN KEY (`user_id`) REFERENCES `user_entity` (`id`),
  CONSTRAINT `FK3s4jktret4nl7m8yhfc8mfrn5` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sos.purchase:~34 rows (대략적) 내보내기
INSERT INTO `purchase` (`created_at`, `is_deleted`, `modified_at`, `product_id`, `user_id`) VALUES
	('2024-04-04 01:57:44.826754', b'0', '2024-04-04 01:57:44.826754', 1, 8),
	('2024-04-03 18:32:57.942432', b'0', '2024-04-03 18:32:57.942432', 2, 2),
	('2024-04-04 10:04:05.963379', b'0', '2024-04-04 10:04:05.963379', 2, 6),
	('2024-04-04 09:03:58.106863', b'0', '2024-04-04 09:03:58.106863', 2, 7),
	('2024-04-04 00:19:55.170212', b'0', '2024-04-04 00:19:55.170212', 2, 8),
	('2024-04-04 10:41:50.585520', b'0', '2024-04-04 10:41:50.585520', 2, 14),
	('2024-04-04 01:48:32.999600', b'0', '2024-04-04 01:48:32.999600', 3, 2),
	('2024-04-04 04:56:37.538255', b'0', '2024-04-04 04:56:37.538255', 3, 6),
	('2024-04-04 10:10:57.501041', b'0', '2024-04-04 10:10:57.501041', 3, 7),
	('2024-04-04 00:40:28.548345', b'0', '2024-04-04 00:40:28.548345', 3, 8),
	('2024-04-04 00:17:33.880506', b'0', '2024-04-04 00:17:33.880506', 3, 9),
	('2024-04-04 10:30:50.806142', b'0', '2024-04-04 10:30:50.806142', 3, 14),
	('2024-04-04 11:03:08.906847', b'0', '2024-04-04 11:03:08.906847', 3, 17),
	('2024-04-04 10:05:32.238964', b'0', '2024-04-04 10:05:32.238964', 4, 1),
	('2024-04-04 10:04:25.493832', b'0', '2024-04-04 10:04:25.493832', 4, 2),
	('2024-04-04 01:49:00.367938', b'0', '2024-04-04 01:49:00.367938', 4, 6),
	('2024-04-04 09:03:41.044114', b'0', '2024-04-04 09:03:41.044114', 4, 7),
	('2024-04-03 21:51:05.837101', b'0', '2024-04-03 21:51:05.837101', 4, 8),
	('2024-04-04 05:09:50.480231', b'0', '2024-04-04 05:09:50.480231', 4, 13),
	('2024-04-04 01:32:17.264537', b'0', '2024-04-04 01:32:17.264537', 6, 2),
	('2024-04-03 23:47:05.215336', b'0', '2024-04-03 23:47:05.215336', 6, 7),
	('2024-04-04 08:38:44.153468', b'0', '2024-04-04 08:38:44.153468', 6, 8),
	('2024-04-04 00:18:39.142030', b'0', '2024-04-04 00:18:39.142030', 6, 10),
	('2024-04-04 10:32:05.357337', b'0', '2024-04-04 10:32:05.357337', 6, 14),
	('2024-04-03 23:27:14.284603', b'0', '2024-04-03 23:27:14.284603', 7, 2),
	('2024-04-04 09:03:05.266038', b'0', '2024-04-04 09:03:05.266038', 7, 7),
	('2024-04-04 08:38:03.915672', b'0', '2024-04-04 08:38:03.915672', 7, 8),
	('2024-04-04 00:24:15.436649', b'0', '2024-04-04 00:24:15.436649', 7, 11),
	('2024-04-04 10:42:05.817982', b'0', '2024-04-04 10:42:05.817982', 7, 14),
	('2024-04-04 10:40:27.144159', b'0', '2024-04-04 10:40:27.144159', 7, 15),
	('2024-04-04 11:00:16.959404', b'0', '2024-04-04 11:00:16.959404', 7, 16),
	('2024-04-04 08:55:57.774212', b'0', '2024-04-04 08:55:57.774212', 8, 8),
	('2024-04-03 22:20:46.445480', b'0', '2024-04-03 22:20:46.445480', 9, 6),
	('2024-04-04 08:38:03.915660', b'0', '2024-04-04 08:38:03.915660', 10, 8);

-- 테이블 sos.user_entity 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_entity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `gold` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `wallet_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sos.user_entity:~21 rows (대략적) 내보내기
INSERT INTO `user_entity` (`id`, `email`, `gold`, `name`, `product_name`, `role`, `username`, `wallet_address`) VALUES
	(1, 'jjhh1545@gmail.com', 3050, '이주희', 'Zuhee', 'ROLE_USER', 'google 113019454038418941565', '0x3D27CBFB5a5290A97Bdd16a58588B4bBf4543052'),
	(2, 'dlwndus0728@ajou.ac.kr', 950, '이주연', 'rare2', 'ROLE_USER', 'google 101168214272694004841', '0x24fb48f4877c7e8d870cdff286be0206c5fa6486'),
	(4, 'wndus0728@hanmail.net', 400, '이주연', NULL, 'ROLE_USER', 'kakao 3383685573', '0x0D82836E00c5a8CC38346Cb0AeF91BF4480BEe00'),
	(5, 'eunby0224@gmail.com', 200, '조은비', NULL, 'ROLE_USER', 'google 101609833447178186229', '0x1Ab07c5E21CB64DA7E3D7F91a86d7Bf87472c6Bf'),
	(6, 'ysy1644@naver.com', 900, '용상윤', 'legendary2', 'ROLE_USER', 'kakao 3394041383', '0x70f3428187fc38520E15ed6401F83303c71e47df'),
	(7, 'wowhd45@naver.com', 9250, '이재종', 'common3', 'ROLE_USER', 'kakao 3394041671', '0x433B13d82751fCE8B48B5F986e33721a11D90eF9'),
	(8, 'jesus9991@naver.com', 700, '이주연', NULL, 'ROLE_USER', 'naver g_NxNjn74kd0gdDpafjEUranC-7eFZIed2i1VYs7uCY', '0xC0C8b2F14a9c4048c2999Fd533161d77aE6DFE7D'),
	(9, 'jaehwaseo.code@gmail.com', 50, '서재화', NULL, 'ROLE_USER', 'google 116427943770549371704', NULL),
	(10, 'dkekzhs5@naver.com', 50, '이동재', NULL, 'ROLE_USER', 'kakao 3420860408', '0xE98961BD8e27703459ae32E89098BdCe573beA3e'),
	(11, 'a25445919@gmail.com', 10000, '이재종', NULL, 'ROLE_USER', 'google 108671234237849062452', NULL),
	(12, 'tkddbs1644@gmail.com', 200, '용상윤', NULL, 'ROLE_USER', 'google 110725686940716198675', '0xdfb08a11dEBfa4a1CcEaf35AE13ee00A132f71a1'),
	(13, 'kjh97112@naver.com', 10000, '김재형', '각진 배', 'ROLE_USER', 'kakao 3415790325', '0x6CcF51d89E67f470aEA16f1FEFd05cff107fAB98'),
	(14, 'kjhstar971124@gmail.com', 9650, '김재형', 'common2', 'ROLE_USER', 'google 111916967183829020390', '0x24FB48f4877c7e8D870cdFF286BE0206C5FA6486'),
	(15, 'csj9912@gmail.com', 50, '최승준', NULL, 'ROLE_USER', 'google 104703624127321477347', '0x4370169f8B1d73B8b3FC31A6E4A1bc965AFc67C5'),
	(16, 'amuva@naver.com', 50, '윤주석', 'rare3', 'ROLE_USER', 'kakao 3421243033', '0xF7a89e73c4f74cF812Fd26627bE4E9C24eDf0603'),
	(17, 'seol3964@gmail.com', 50, '서울_9반_김대현', 'common2', 'ROLE_USER', 'google 100628330671264641517', '0xb32E1F6B0e940A3f3173286b8647af8C3a65ABd6'),
	(18, 'woghk6761@naver.com', 200, '서재화', NULL, 'ROLE_USER', 'kakao 3421254045', NULL),
	(19, 'use020422@gmail.com', 200, '서울_3반_장태수', NULL, 'ROLE_USER', 'google 110175437395979317383', NULL),
	(20, '3dlalswl3@naver.com', 200, '이민지', NULL, 'ROLE_USER', 'kakao 3421264880', '0x98C50BE39a4491e460Ca117194977D5C78c74E7E'),
	(21, 'n2one@naver.com', 200, '박수민', NULL, 'ROLE_USER', 'kakao 3421267521', NULL),
	(22, 'mike0413@naver.com', 200, '정덕주', NULL, 'ROLE_USER', 'kakao 3421272425', NULL);

-- 테이블 sos.wallet 구조 내보내기
CREATE TABLE IF NOT EXISTS `wallet` (
  `address` varchar(255) NOT NULL,
  `mnemonic` varchar(255) DEFAULT NULL,
  `private_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sos.wallet:~19 rows (대략적) 내보내기
INSERT INTO `wallet` (`address`, `mnemonic`, `private_key`) VALUES
	('0x0D82836E00c5a8CC38346Cb0AeF91BF4480BEe00', 'shoulder replace lesson public pioneer tenant wheel whale replace pistol split mandate', '0x510ceaa82d1655f3cd3634ba0da16b744fa34899e3a033517bebd18d98d59326'),
	('0x127801F6a03262A5eb40D9d72627454aC3adCf82', NULL, NULL),
	('0x1Ab07c5E21CB64DA7E3D7F91a86d7Bf87472c6Bf', NULL, NULL),
	('0x24FB48f4877c7e8D870cdFF286BE0206C5FA6486', NULL, NULL),
	('0x3D27CBFB5a5290A97Bdd16a58588B4bBf4543052', NULL, NULL),
	('0x433B13d82751fCE8B48B5F986e33721a11D90eF9', 'erase icon fence admit seven quality actor copy boil wire tent spoil', '0x52676e5e61f4350e83fcbcdbc7a32b683960ce810d158e41e8aa74eb506ba2ab'),
	('0x4370169f8B1d73B8b3FC31A6E4A1bc965AFc67C5', 'iron ankle inner again useless food proof quick spring strong doctor enrich', '0xb1431a315efda36a1920077532c3fe21b0700523c3488385f2947e2db5dcae12'),
	('0x63A909fAF325eB917d73322e03Adaed6C8edC24f', 'hole pretty ostrich extend blanket cargo piece repair innocent fade rebel leave', '0xfb180159d023c7fbb87e8cd804a8950d1be22c4f42419bc53cc3bb50a2715372'),
	('0x67b830928d7E02D334Cc5A28680F079B0e4c1aC7', 'fox assault used can cube twice such stove flock someone top small', '0xd89dd7932c5fa891f7740c376ab1b51b4f4c1526a878e3ac240917f4ba9d39ad'),
	('0x6CcF51d89E67f470aEA16f1FEFd05cff107fAB98', NULL, NULL),
	('0x70f3428187fc38520E15ed6401F83303c71e47df', 'shy window tide material behave budget tone injury swear record steak tiny', '0xcbdd576494afe50c5e0022551a410c09519bc33f1aec9cb63697bb7051b6f64b'),
	('0x98C50BE39a4491e460Ca117194977D5C78c74E7E', 'adjust floor wreck fabric exact ten brave bridge inmate mechanic neutral stock', '0x9d5235afe3d82fd1dde4c6b9c00d6d63395bc6fe1b1f23d659b644188eb2856c'),
	('0xb32E1F6B0e940A3f3173286b8647af8C3a65ABd6', 'orient canal sea high chunk gentle hen input evil verb wire power', '0xbe2394f59b39bf42b7aaccc2dee707e15e8be0bdc5f2642b3cad63f282bdff35'),
	('0xC0C8b2F14a9c4048c2999Fd533161d77aE6DFE7D', 'resemble dignity exclude ritual cricket olympic amused obscure omit decrease material snack', '0x1277e9ab8bfc4d9baca0984fd0698e4573b4510e913a01d4f33fd2305ffa6539'),
	('0xDD2826dD545842c18396B1162A5534Ffa237B960', 'fatal exit horn picnic tiger depart equip catch mass step dirt alcohol', '0x87ecb68821a7963c1b0451609f751d2c011dab3db2ff2530ef44c668dfd8e208'),
	('0xdfb08a11dEBfa4a1CcEaf35AE13ee00A132f71a1', 'know harvest amount dwarf expand arch pizza sphere post simple joke spy', '0x54f3bfdd52678d252af63425bf087617a691c132da71ef270f55dffedfd41f76'),
	('0xe0549770DF405e246C37eb0Ad8afb234b5b92049', 'elephant erode fat theory payment valid civil shy swing rude panther dash', '0xcf6195ff6c60eedc5cb0a9cab81bd553dd746a297c1e20b67476e5796d4e4a72'),
	('0xE98961BD8e27703459ae32E89098BdCe573beA3e', 'ball invest core brain avocado across maze result twist laundry convince donate', '0x634c5b9447fe902e957a8f8f04567aa900fcf80b27c1bd69a562dab18987a20a'),
	('0xF7a89e73c4f74cF812Fd26627bE4E9C24eDf0603', 'travel culture suspect enact review shoe pond bitter join chimney undo oblige', '0x821dbbe5205855affa4838e488445494b36d971a28afbc3055f3bf376448a623');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
