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
-- Name: data_anlys_field; Type: TABLE; Schema: public; Owner: INDIV
--

CREATE TABLE public.data_anlys_field (
    field_type character varying NOT NULL,
    field_name character varying NOT NULL,
    type_code character varying NOT NULL,
    is_active boolean,
    create_by character varying,
    create_date timestamp without time zone,
    seq_no integer
);


ALTER TABLE public.data_anlys_field OWNER TO "INDIV";

--
-- Name: data_anlys_info; Type: TABLE; Schema: public; Owner: INDIV
--

CREATE TABLE public.data_anlys_info (
    id integer NOT NULL,
    type_code character varying,
    create_by character varying,
    create_date timestamp without time zone,
    update_by character varying,
    update_date timestamp without time zone,
    models jsonb
);


ALTER TABLE public.data_anlys_info OWNER TO "INDIV";

--
-- Name: data_anlys_info_id_seq; Type: SEQUENCE; Schema: public; Owner: INDIV
--

CREATE SEQUENCE public.data_anlys_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_anlys_info_id_seq OWNER TO "INDIV";

--
-- Name: data_anlys_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: INDIV
--

ALTER SEQUENCE public.data_anlys_info_id_seq OWNED BY public.data_anlys_info.id;


--
-- Name: data_anlys_input; Type: TABLE; Schema: public; Owner: INDIV
--

CREATE TABLE public.data_anlys_input (
    id integer NOT NULL,
    info_id integer NOT NULL,
    field_type character varying NOT NULL,
    field_name character varying NOT NULL,
    type_code character varying,
    field_value text,
    is_file boolean,
    file_name character varying,
    file_path character varying
);


ALTER TABLE public.data_anlys_input OWNER TO "INDIV";

--
-- Name: data_anlys_input_id_seq; Type: SEQUENCE; Schema: public; Owner: INDIV
--

CREATE SEQUENCE public.data_anlys_input_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_anlys_input_id_seq OWNER TO "INDIV";

--
-- Name: data_anlys_input_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: INDIV
--

ALTER SEQUENCE public.data_anlys_input_id_seq OWNED BY public.data_anlys_input.id;


--
-- Name: data_anlys_output; Type: TABLE; Schema: public; Owner: INDIV
--

CREATE TABLE public.data_anlys_output (
    id integer NOT NULL,
    info_id integer,
    result jsonb
);


ALTER TABLE public.data_anlys_output OWNER TO "INDIV";

--
-- Name: data_anlys_output_id_seq; Type: SEQUENCE; Schema: public; Owner: INDIV
--

CREATE SEQUENCE public.data_anlys_output_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.data_anlys_output_id_seq OWNER TO "INDIV";

--
-- Name: data_anlys_output_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: INDIV
--

ALTER SEQUENCE public.data_anlys_output_id_seq OWNED BY public.data_anlys_output.id;


--
-- Name: data_anlys_type; Type: TABLE; Schema: public; Owner: INDIV
--

CREATE TABLE public.data_anlys_type (
    type_code character varying NOT NULL,
    type_name character varying NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public.data_anlys_type OWNER TO "INDIV";

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
-- Name: data_anlys_info id; Type: DEFAULT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_info ALTER COLUMN id SET DEFAULT nextval('public.data_anlys_info_id_seq'::regclass);


--
-- Name: data_anlys_input id; Type: DEFAULT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_input ALTER COLUMN id SET DEFAULT nextval('public.data_anlys_input_id_seq'::regclass);


--
-- Name: data_anlys_output id; Type: DEFAULT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_output ALTER COLUMN id SET DEFAULT nextval('public.data_anlys_output_id_seq'::regclass);


--
-- Data for Name: data_anlys_field; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public.data_anlys_field (field_type, field_name, type_code, is_active, create_by, create_date, seq_no) FROM stdin;
TextBox	compoundsTextBox	BindingAffinityPrediction	t	test01	2022-04-07 07:08:55	3
TextBox	proteinsTextBox	BindingAffinityPrediction	t	test01	2022-04-07 07:05:57	1
FileUpload	proteinsFileUpload	BindingAffinityPrediction	t	test01	2022-04-07 07:19:25	2
FileUpload	compoundsFileUpload	BindingAffinityPrediction	t	test01	2022-04-07 07:19:49	4
\.


--
-- Data for Name: data_anlys_info; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public.data_anlys_info (id, type_code, create_by, create_date, update_by, update_date, models) FROM stdin;
1	BindingAffinityPrediction	test01	2022-04-07 07:04:12	test01	2022-04-08 02:45:11	["mode11", "model2"]
\.


--
-- Data for Name: data_anlys_input; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public.data_anlys_input (id, info_id, field_type, field_name, type_code, field_value, is_file, file_name, file_path) FROM stdin;
1	1	TextBox	proteinsTextBox	BindingAffinityPrediction	>O00141\nMTVKTEAAKGTLTYSRMRGMVAILIAFMKQRRMGLNDFIQKIANNSYACKHPEVQSILKISQPQEPELMNANPSPPPSPSQQINLGPSSNPHAKPSDFHFLKVIGKGSFGKVLLARHKAEEVFYAVKVLQKKAILKKKEEKHIMSERNVLLKNVKHPFLVGLHFSFQTADKLYFVLDYINGGELFYHLQRERCFLEPRARFYAAEIASALGYLHSLNIVYRDLKPENILLDSQGHIVLTDFGLCKENIEHNSTTSTFCGTPEYLAPEVLHKQPYDRTVDWWCLGAVLYEMLYGLPPFYSRNTAEMYDNILNKPLQLKPNITNSARHLLEGLLQKDRTKRLGAKDDFMEIKSHVFFSLINWDDLINKKITPPFNPNVSGPNDLRHFDPEFTEEPVPNSIGKSPDSVLVTASVKEAAEAFLGFSYAPPTDSFL\n>O00311\nMEASLGIQMDEPMAFSPQRDRFQAEGSLKKNEQNFKLAGVKKDIEKLYEAVPQLSNVFKIEDKIGEGTFSSVYLATAQLQVGPEEKIALKHLIPTSHPIRIAAELQCLTVAGGQDNVMGVKYCFRKNDHVVIAMPYLEHESFLDILNSLSFQEVREYMLNLFKALKRIHQFGIVHRDVKPSNFLYNRRLKKYALVDFGLAQGTHDTKIELLKFVQSEAQQERCSQNKSHIITGNKIPLSGPVPKELDQQSTTKASVKRPYTNAQIQIKQGKDGKEGSVGLSVQRSVFGERNFNIHSSISHESPAVKLMKQSKTVDVLSRKLATKKKAISTKVMNSAVMRKTASSCPASLTCDCYATDKVCSICLSRRQQVAPRAGTPGFRAPEVLTKCPNQTTAIDMWSAGVIFLSLLSGRYPFYKASDDLTALAQIMTIRGSRETIQAAKTFGKSILCSKEVPAQDLRKLCERLRGMDSSTPKLTSDIQGHASHQPAISEKTDHKASCLVQTPPGQYSGNSFKKGDSNSCEHCFDEYNTNLEGWNEVPDEAYDLLDKLLDLNPASRITAEEALLHPFFKDMSL\n>O00329\nMPPGVDCPMEFWTKEENQSVVVDFLLPTGVYLNFPVSRNANLSTIKQLLWHRAQYEPLFHMLSGPEAYVFTCINQTAEQQELEDEQRRLCDVQPFLPVLRLVAREGDRVKKLINSQISLLIGKGLHEFDSLCDPEVNDFRAKMCQFCEEAAARRQQLGWEAWLQYSFPLQLEPSAQTWGPGTLRLPNRALLVNVKFEGSEESFTFQVSTKDVPLALMACALRKKATVFRQPLVEQPEDYTLQVNGRHEYLYGSYPLCQFQYICSCLHSGLTPHLTMVHSSSILAMRDEQSNPAPQVQKPRAKPPPIPAKKPSSVSLWSLEQPFRIELIQGSKVNADERMKLVVQAGLFHGNEMLCKTVSSSEVSVCSEPVWKQRLEFDINICDLPRMARLCFALYAVIEKAKKARSTKKKSKKADCPIAWANLMLFDYKDQLKTGERCLYMWPSVPDEKGELLNPTGTVRSNPNTDSAAALLICLPEVAPHPVYYPALEKILELGRHSECVHVTEEEQLQLREILERRGSGELYEHEKDLVWKLRHEVQEHFPEALARLLLVTKWNKHEDVAQMLYLLCSWPELPVLSALELLDFSFPDCHVGSFAIKSLRKLTDDELFQYLLQLVQVLKYESYLDCELTKFLLDRALANRKIGHFLFWHLRSEMHVPSVALRFGLILEAYCRGSTHHMKVLMKQGEALSKLKALNDFVKLSSQKTPKPQTKELMHLCMRQEAYLEALSHLQSPLDPSTLLAEVCVEQCTFMDSKMKPLWIMYSNEEAGSGGSVGIIFKNGDDLRQDMLTLQMIQLMDVLWKQEGLDLRMTPYGCLPTGDRTGLIEVVLRSDTIANIQLNKSNMAATAAFNKDALLNWLKSKNPGEALDRAIEEFTLSCAGYCVATYVLGIGDRHSDNIMIRESGQLFHIDFGHFLGNFKTKFGINRERVPFILTYDFVHVIQQGKTNNSEKFERFRGYCERAYTILRRHGLLFLHLFALMRAAGLPELSCSKDIQYLKDSLALGKTEEEALKHFRVKFNEALRESWKTKVNWLAHNVSKDNRQ	f	\N	\N
2	1	TextBox	compoundsTextBox	BindingAffinityPrediction	>CHEMBL1087421\nCOC1=C(C=C2C(=C1)CCN=C2C3=CC(=C(C=C3)Cl)Cl)Cl\n>CHEMBL1088633\nCOC1=C(C=C2C(=C1)CCN=C2C3=CC(=CC=C3)Cl)Cl\n>CHEMBL1090360\nC1COCCN1C2=CC(=CC=C2)NC3=NC=CC(=N3)C4=C(N=C5N4C=CS5)C6=CC(=CC=C6)NC(=O)CC7=CC=CC=C7	f	\N	\N
\.


--
-- Data for Name: data_anlys_output; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public.data_anlys_output (id, info_id, result) FROM stdin;
1	1	{"2D": "** an object for visualization **", "SMILES": "COC1=C(C=C2C(=C1)CCN=C2C3=CC(=C(C=C3)Cl)Cl)Cl", "proteinID": "O00141", "compoundID": "CHEMBL1087421", "bindingAffinity": 4.5}
2	1	{"2D": "** an object for visualization **", "SMILES": "COC1=C(C=C2C(=C1)CCN=C2C3=CC(=CC=C3)Cl)Cl", "proteinID": "O00141", "compoundID": "CHEMBL1088633", "bindingAffinity": 1000}
3	1	{"2D": "** an object for visualization **", "SMILES": "C1COCCN1C2=CC(=CC=C2)NC3=NC=CC(=N3)C4=C(N=C5N4C=CS5)C6=CC(=CC=C6)NC(=O)CC7=CC=CC=C7", "proteinID": "O00141", "compoundID": "CHEMBL1090360", "bindingAffinity": 2}
4	1	{"2D": "** an object for visualization **", "SMILES": "C1=CC2=C(C=C1C3=NC(=NC=C3)N)NN=C2N", "proteinID": "O00141", "compoundID": "CHEMBL1688215", "bindingAffinity": 3.2}
\.


--
-- Data for Name: data_anlys_type; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public.data_anlys_type (type_code, type_name, is_active) FROM stdin;
BindingAffinityPrediction	Binding Affinity Prediction	t
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: INDIV
--

COPY public."user" (username, email, password) FROM stdin;
test01	test01@gmail.com	$2a$12$OyH10ZugClO4CHwAfxBcZ.Aj5kMp2WQSvGo.2.LqabPB5eRuRxEXW
test02	test02@gmail.com	$2a$12$YMYXJ/0IOY5n2xAurb2pcOO3H1wcwizD6FMi9QmuUbfYUbdIopM9a
test03	test03@gmail.com	$2a$12$S1BONGhY0I/zYhPh.4niXuQL72kUtJ4XnnMSDdCdhr93DE2BewrHO
test04	test04@gmail.com	$2a$12$BDdmBrbe/Pz4bH./KW3FRuGyJuIWWy/uwY8BF2Z6o1iSKxQSeD8Ay
test05	test05@gmail.com	$2a$12$OPlrLmIKKhElsG6S5.0XvOm.RNsKst2jQRQ7PB2/fi9uKj8KQUnue
test06	test06@gmail.com	$2a$12$7UOhThE83Ersaq.Q4PKLT.E5YPHJHiUYyA81LbmGtTTrefIBGUWbK
\.


--
-- Name: data_anlys_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: INDIV
--

SELECT pg_catalog.setval('public.data_anlys_info_id_seq', 1, true);


--
-- Name: data_anlys_input_id_seq; Type: SEQUENCE SET; Schema: public; Owner: INDIV
--

SELECT pg_catalog.setval('public.data_anlys_input_id_seq', 2, true);


--
-- Name: data_anlys_output_id_seq; Type: SEQUENCE SET; Schema: public; Owner: INDIV
--

SELECT pg_catalog.setval('public.data_anlys_output_id_seq', 4, true);


--
-- Name: data_anlys_field data_anlys_field_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_field
    ADD CONSTRAINT data_anlys_field_pk PRIMARY KEY (field_type, field_name, type_code);


--
-- Name: data_anlys_info data_anlys_info_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_info
    ADD CONSTRAINT data_anlys_info_pk PRIMARY KEY (id);


--
-- Name: data_anlys_input data_anlys_input_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_input
    ADD CONSTRAINT data_anlys_input_pk PRIMARY KEY (id);


--
-- Name: data_anlys_output data_anlys_output_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_output
    ADD CONSTRAINT data_anlys_output_pk PRIMARY KEY (id);


--
-- Name: data_anlys_type data_anlys_type_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_type
    ADD CONSTRAINT data_anlys_type_pk PRIMARY KEY (type_code);


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (username);


--
-- Name: data_anlys_field data_anlys_field_data_anlys_type_type_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_field
    ADD CONSTRAINT data_anlys_field_data_anlys_type_type_code_fk FOREIGN KEY (type_code) REFERENCES public.data_anlys_type(type_code);


--
-- Name: data_anlys_info data_anlys_info_create_by_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_info
    ADD CONSTRAINT data_anlys_info_create_by_fk FOREIGN KEY (create_by) REFERENCES public."user"(username);


--
-- Name: data_anlys_info data_anlys_info_data_anlys_type_type_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_info
    ADD CONSTRAINT data_anlys_info_data_anlys_type_type_code_fk FOREIGN KEY (type_code) REFERENCES public.data_anlys_type(type_code);


--
-- Name: data_anlys_info data_anlys_info_update_by_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_info
    ADD CONSTRAINT data_anlys_info_update_by_fk FOREIGN KEY (update_by) REFERENCES public."user"(username);


--
-- Name: data_anlys_input data_anlys_input_data_anlys_field_field_type_field_name_type_co; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_input
    ADD CONSTRAINT data_anlys_input_data_anlys_field_field_type_field_name_type_co FOREIGN KEY (field_type, field_name, type_code) REFERENCES public.data_anlys_field(field_type, field_name, type_code);


--
-- Name: data_anlys_input data_anlys_input_data_anlys_info_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_input
    ADD CONSTRAINT data_anlys_input_data_anlys_info_id_fk FOREIGN KEY (info_id) REFERENCES public.data_anlys_info(id);


--
-- Name: data_anlys_input data_anlys_input_data_anlys_type_type_code_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_input
    ADD CONSTRAINT data_anlys_input_data_anlys_type_type_code_fk FOREIGN KEY (type_code) REFERENCES public.data_anlys_type(type_code);


--
-- Name: data_anlys_output data_anlys_output_data_anlys_info_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: INDIV
--

ALTER TABLE ONLY public.data_anlys_output
    ADD CONSTRAINT data_anlys_output_data_anlys_info_id_fk FOREIGN KEY (info_id) REFERENCES public.data_anlys_info(id);


--
-- PostgreSQL database dump complete
--

