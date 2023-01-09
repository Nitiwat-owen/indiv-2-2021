import axios from 'axios';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Mol2D from './Table/Mol2D';


const Home: React.FC = () => {

    return (
        <div>
        <Mol2D SMILES='C1CCC(N)C1' />
        <Mol2D SMILES='C1COCCN1C2=CC(=CC=C2)NC3=NC=CC(=N3)C4=C(N=C5N4C=CS5)C6=CC(=CC=C6)NC(=O)CC7=CC=CC=C7' />
        </div>
    );
};
export default Home;
