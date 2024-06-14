-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-06-2024 a las 19:41:04
-- Versión del servidor: 10.6.18-MariaDB-log
-- Versión de PHP: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `transforstone_app`
--

CREATE DATABASE IF NOT EXISTS `transforstone_app` 
DEFAULT CHARACTER 
SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `transforstone_app`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consumible`
--

CREATE TABLE `consumible` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consumible`
--

INSERT INTO `consumible` (`id`, `nombre`, `precio`, `id_maquina`) VALUES
(6, 'Consumibles MULTI-HILO', 10, 12),
(7, 'Consumibles TELAR', 10, 13),
(8, 'Consumibles CORTA-BLOQUES', 10, 14),
(9, 'Consumibles DISCO-PUENTE', 10, 15),
(10, 'Consumibles PULIDORA', 10, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_energetico`
--

CREATE TABLE `gasto_energetico` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `coste_energia` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gasto_energetico`
--

INSERT INTO `gasto_energetico` (`id`, `nombre`, `coste_energia`, `id_maquina`) VALUES
(4, 'Gasto Energético MULTI-HILO', 10, 12),
(5, 'Gasto Energético TELAR', 10, 13),
(6, 'Gasto Energético CORTA-BLOQUES', 10, 14),
(7, 'Gasto Energético DISCO-PUENTE', 10, 15),
(8, 'Gasto Energético PULIDORA', 10, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_general`
--

CREATE TABLE `gasto_general` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gasto_general`
--

INSERT INTO `gasto_general` (`id`, `nombre`, `precio`) VALUES
(5, 'Gastos Sin Asignar', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquina`
--

CREATE TABLE `maquina` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `produccion_m2` float DEFAULT NULL,
  `porcentaje_desperdicio` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maquina`
--

INSERT INTO `maquina` (`id`, `nombre`, `produccion_m2`, `porcentaje_desperdicio`) VALUES
(12, 'Multi-hilo', 51708, 10),
(13, 'Telar', 17553, 10),
(14, 'Corta-bloques', 21874, 10),
(15, 'Disco-puente', 42000, 10),
(16, 'Pulidora', 32000, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_prima`
--

CREATE TABLE `materia_prima` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad_m3` float DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia_prima`
--

INSERT INTO `materia_prima` (`id`, `nombre`, `cantidad_m3`, `precio`) VALUES
(5, 'Bloques de 1ª', 877, 260),
(6, 'Bloques de 2ª', 1126, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partes_cortabloques`
--

CREATE TABLE `partes_cortabloques` (
  `id` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `numero_bloque` int(5) DEFAULT NULL,
  `bis` tinyint(1) NOT NULL DEFAULT 0,
  `retal` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partes_cortabloques`
--

INSERT INTO `partes_cortabloques` (`id`, `fecha_inicio`, `fecha_fin`, `hora_inicio`, `hora_fin`, `observaciones`, `numero_trabajador`, `numero_bloque`, `bis`, `retal`) VALUES
(10, '2024-06-13', '2024-06-06', '03:47:00', '03:47:00', 'Prueba', 999, 77778, 1, 0),
(12, '2024-06-11', '2024-06-11', '16:38:00', '16:38:00', 'Prueba', 101, 25500, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion_maquina`
--

CREATE TABLE `produccion_maquina` (
  `id` int(11) NOT NULL,
  `id_parte` int(11) DEFAULT NULL,
  `largo` float DEFAULT NULL,
  `ancho` float DEFAULT NULL,
  `grosor` float DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `produccion_maquina`
--

INSERT INTO `produccion_maquina` (`id`, `id_parte`, `largo`, `ancho`, `grosor`, `cantidad`) VALUES
(22, 10, 58, 10, 5, 6),
(24, 12, 60, 40, 2, 5),
(25, 12, 40, 40, 2, 10),
(26, 12, 100, 60, 2, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido1` varchar(255) DEFAULT NULL,
  `apellido2` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajador`
--

INSERT INTO `trabajador` (`id`, `numero_trabajador`, `nombre`, `apellido1`, `apellido2`, `activo`) VALUES
(1, 101, 'Administrador', '.', '.', 1),
(4, 999, 'Pedro', 'Martínez', 'López', 0),
(9, 1, 'Juan ', 'Pérez', 'González', 1),
(10, 2, 'Esteban', 'Pérez', 'González', 1),
(11, 3, 'Ana ', 'Marín', 'Fernández', 1),
(12, 4, 'Páqui', 'Navarro', 'López', 1),
(13, 5, 'Pepe', 'Boluda', 'Reyez', 1),
(14, 6, 'Darío', 'Frutos', 'García', 1);

--
-- Disparadores `trabajador`
--
DELIMITER $$
CREATE TRIGGER `after_trabajador_update` AFTER UPDATE ON `trabajador` FOR EACH ROW BEGIN
    IF NEW.activo = FALSE THEN
        DELETE FROM trabajador_costes WHERE numero_trabajador = NEW.numero_trabajador;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador_costes`
--

CREATE TABLE `trabajador_costes` (
  `id` int(11) NOT NULL,
  `numero_trabajador` int(11) NOT NULL,
  `precio` float DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajador_costes`
--

INSERT INTO `trabajador_costes` (`id`, `numero_trabajador`, `precio`, `id_maquina`) VALUES
(19, 101, 600000, NULL),
(20, 1, 30000, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporte`
--

CREATE TABLE `transporte` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transporte`
--

INSERT INTO `transporte` (`id`, `nombre`, `cantidad`, `precio`) VALUES
(3, 'Transporte de Cantera a Fábrica', 10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `numero_trabajador` int(11) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_conexion` timestamp NULL DEFAULT NULL,
  `roles` enum('ADMIN','TRABAJADOR') DEFAULT 'TRABAJADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `numero_trabajador`, `fecha_registro`, `ultima_conexion`, `roles`) VALUES
(6, 'admin@admin.es', '$2b$10$qH8/KkSHlxFQEKPyK8hya.hSbuJc1f7kgtHG0uq/qvc2VxBk5w.CS', 101, '2024-05-15 08:16:58', '2024-06-13 17:29:08', 'ADMIN'),
(9, 'pedro@sueloparaexterior.com', '$2b$10$qvuT493HkvvuTXUhW2MsMO/uhuopby8cuVMeEZvw5jkUXtmoyL.7i', 999, '2024-05-15 08:16:58', '2024-06-06 13:35:19', 'TRABAJADOR'),
(16, 'marketing@transforstone.com', '$2b$10$jlxC4zu1X8b8O0rKyulwP.Xto/zXHNjLTEDTDOLpsm0vJj9rcdACu', 1, '2024-06-11 14:46:39', NULL, 'ADMIN'),
(17, 'e.perez@transforstone.com', '$2b$10$9Kj4AXM5N7f/.HIRT6n2Y.kmlTOdG6TN30oOp1agszCI69.FGnXfe', 2, '2024-06-11 14:49:22', NULL, 'TRABAJADOR'),
(18, 'ventas@transforstone.com', '$2b$10$vvBx2UiAx0KovbFo3tmwZ.natvlkFepoPHPKVFXwnN37Ji5gAht2q', 3, '2024-06-11 14:50:15', NULL, 'TRABAJADOR'),
(19, 'oficina@transforstone.com', '$2b$10$ht4UJYmi/ADtZ.Z46QrbA.0zSLh6zex7c0eRGuEutDtrWNiG8hjPK', 4, '2024-06-11 14:50:54', NULL, 'TRABAJADOR'),
(20, 'produccion@transforstone.com', '$2b$10$yU5e9yVA8pIce/nLmwFJP.Wby7CMDhotMcdO26Nevc05Gv3bRm7cq', 5, '2024-06-11 14:51:37', NULL, 'TRABAJADOR'),
(21, 'tecnico.ot@transforstone.com', '$2b$10$vxUhEGQi3TbL3KBZYmpd.eEQVBXCbFUdTil/KkV6uku17wkDNBZ/K', 6, '2024-06-11 14:52:45', NULL, 'TRABAJADOR');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consumible`
--
ALTER TABLE `consumible`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `gasto_general`
--
ALTER TABLE `gasto_general`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `maquina`
--
ALTER TABLE `maquina`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partes_cortabloques`
--
ALTER TABLE `partes_cortabloques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_parte_cortabloques_numero_trabajdor` (`numero_trabajador`);

--
-- Indices de la tabla `produccion_maquina`
--
ALTER TABLE `produccion_maquina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_parte` (`id_parte`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_trabajdor_UNIQUE` (`numero_trabajador`);

--
-- Indices de la tabla `trabajador_costes`
--
ALTER TABLE `trabajador_costes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_maquina` (`id_maquina`),
  ADD KEY `fk_trabajador_costes_numero_trabajdor` (`numero_trabajador`);

--
-- Indices de la tabla `transporte`
--
ALTER TABLE `transporte`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_numero_trabajdor` (`numero_trabajador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consumible`
--
ALTER TABLE `consumible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `gasto_general`
--
ALTER TABLE `gasto_general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `maquina`
--
ALTER TABLE `maquina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `materia_prima`
--
ALTER TABLE `materia_prima`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `partes_cortabloques`
--
ALTER TABLE `partes_cortabloques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `produccion_maquina`
--
ALTER TABLE `produccion_maquina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `trabajador_costes`
--
ALTER TABLE `trabajador_costes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `transporte`
--
ALTER TABLE `transporte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consumible`
--
ALTER TABLE `consumible`
  ADD CONSTRAINT `consumible_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `gasto_energetico`
--
ALTER TABLE `gasto_energetico`
  ADD CONSTRAINT `gasto_energetico_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `partes_cortabloques`
--
ALTER TABLE `partes_cortabloques`
  ADD CONSTRAINT `fk_parte_cortabloques_numero_trabajdor` FOREIGN KEY (`numero_trabajador`) REFERENCES `trabajador` (`numero_trabajador`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `produccion_maquina`
--
ALTER TABLE `produccion_maquina`
  ADD CONSTRAINT `produccion_maquina_ibfk_1` FOREIGN KEY (`id_parte`) REFERENCES `partes_cortabloques` (`id`);

--
-- Filtros para la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD CONSTRAINT `fk_trabaj_user_numtrabajdor` FOREIGN KEY (`numero_trabajador`) REFERENCES `user` (`numero_trabajador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `trabajador_costes`
--
ALTER TABLE `trabajador_costes`
  ADD CONSTRAINT `fk_trabajador_costes_numero_trabajdor` FOREIGN KEY (`numero_trabajador`) REFERENCES `trabajador` (`numero_trabajador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trabajador_costes_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
