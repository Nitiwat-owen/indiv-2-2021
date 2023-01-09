--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: INDIV
--

CREATE TABLE public."user" (
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO "INDIV";

--
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: INDIV
--

COMMENT ON TABLE public."user" IS 'user';


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public."user" (username, email, password) FROM stdin;
test01	test01@gmail.com	$2a$12$OyH10ZugClO4CHwAfxBcZ.Aj5kMp2WQSvGo.2.LqabPB5eRuRxEXW
test02	test02@gmail.com	$2a$12$YMYXJ/0IOY5n2xAurb2pcOO3H1wcwizD6FMi9QmuUbfYUbdIopM9a
test03	test03@gmail.com	$2a$12$S1BONGhY0I/zYhPh.4niXuQL72kUtJ4XnnMSDdCdhr93DE2BewrHO
test04	test04@gmail.com	$2a$12$BDdmBrbe/Pz4bH./KW3FRuGyJuIWWy/uwY8BF2Z6o1iSKxQSeD8Ay
test05	test05@gmail.com	$2a$12$OPlrLmIKKhElsG6S5.0XvOm.RNsKst2jQRQ7PB2/fi9uKj8KQUnue
\.


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

