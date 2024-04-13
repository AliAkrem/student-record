
--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;






INSERT INTO "public"."course" ("course_id", "name", "abv_name", "created_at", "updated_at") VALUES
	(4, 'Bachelor of Arts', 'BA', '2024-04-13 15:30:00.164368+00', '2024-04-13 15:30:00.164368+00'),
	(5, 'Master of Arts', 'MA', '2024-04-13 15:30:00.164368+00', '2024-04-13 15:30:00.164368+00'),
	(1, 'MASTER OF COMPUTER APPLICATION', 'MCA', '2024-04-13 15:30:00.164368+00', '2024-04-13 16:14:19.089774+00'),
	(2, 'Bachelor of Technology', 'B.eeech', '2024-04-13 15:30:00.164368+00', '2024-04-13 21:00:45.146491+00'),
	(3, 'Bachelor of Computer Application', 'BCA', '2024-04-13 15:30:00.164368+00', '2024-04-13 21:06:02.677375+00');


--
-- Data for Name: subject; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subject" ("subject_id", "name", "created_at", "updated_at", "course_id") VALUES
	(1, 'C Language', '2024-04-13 15:34:04.011508+00', '2024-04-13 15:34:04.011508+00', 2),
	(2, 'Operating System', '2024-04-13 15:34:04.011508+00', '2024-04-13 15:34:04.011508+00', 2),
	(3, 'Mathmatics', '2024-04-13 15:34:04.011508+00', '2024-04-13 15:34:04.011508+00', 2),
	(4, 'Data Structure', '2024-04-13 15:34:04.011508+00', '2024-04-13 15:34:04.011508+00', 2),
	(5, 'C Language', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 3),
	(6, 'Software Engineering', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 3),
	(7, 'Discrete Mathematics', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 3),
	(8, 'Computer Networks', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 3),
	(9, 'History', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 5),
	(10, 'Geography ', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 5),
	(11, 'Sociology ', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 5),
	(12, 'English', '2024-04-13 16:11:01.644149+00', '2024-04-13 16:11:01.644149+00', 5);




--
-- Name: course_course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."course_course_id_seq"', 18, true);


--
-- Name: subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."subject_id_seq"', 12, true);




--
-- PostgreSQL database dump complete
--

RESET ALL;
