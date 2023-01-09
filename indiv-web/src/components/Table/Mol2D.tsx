import React, { useEffect, useRef } from "react";

interface Mol2DProps {
  SMILES: string;
}

const Mol2D = ({ SMILES }: Mol2DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mol = new (window as any).MolViewer.Molecule();
    mol.get2DFromSMILE(SMILES);
    let mol2D;
    mol2D = new (window as any).MolViewer.Mol2D(mol, ref.current).init();
    drawMol();

    function drawMol() {
      mol.parseMol();
      mol.centre();
      mol2D.draw();
    }
  }, []);

  return (
    <div
      style={{
        height: "15vh",
        width: "15vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        ref={ref}
        id="canvas2D"
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
};

export default Mol2D;
