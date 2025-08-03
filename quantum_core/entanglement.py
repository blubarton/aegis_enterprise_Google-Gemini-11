import numpy as np
from qiskit import QuantumCircuit, Aer, execute

ENTANGLEMENT_EQUATIONS = {
    "bell_state": "|ψ⁺⟩ = (|01⟩ + |10⟩)/√2",
    "schrodinger": "iℏ∂/∂t|ψ⟩ = Ĥ|ψ⟩",
    "density_matrix": "ρ = ∑p_i|ψ_i⟩⟨ψ_i|"
}

class EntanglementManager:
    def __init__(self):
        self.equations = ENTANGLEMENT_EQUATIONS
        self.simulator = Aer.get_backend('statevector_simulator')
        
    def create_bell_pair(self):
        qc = QuantumCircuit(2, 2)
        qc.h(0)
        qc.cx(0, 1)
        return qc
        
    def create_ghz_state(self, n=3):
        qc = QuantumCircuit(n, n)
        qc.h(0)
        for i in range(1, n):
            qc.cx(0, i)
        return qc
        
    def measure_entanglement(self, circuit):
        result = execute(circuit, self.simulator).result()
        statevector = result.get_statevector()
        return self.calculate_entanglement_entropy(statevector)
        
    def calculate_entanglement_entropy(self, statevector):
        if len(statevector) == 4:
            psi = statevector.reshape(2, 2)
            schmidt = np.linalg.svd(psi, compute_uv=False)
            entropy = -np.sum(schmidt**2 * np.log2(schmidt**2))
            return entropy
        return 0.0
        
    def quantum_teleport(self, state_to_send):
        bell_circuit = self.create_bell_pair()
        qc = QuantumCircuit(3, 3)
        if state_to_send == '1':
            qc.x(0)
        elif state_to_send == '+':
            qc.h(0)
        elif state_to_send == '-':
            qc.x(0)
            qc.h(0)
        qc = qc.compose(bell_circuit, qubits=[1, 2])
        qc.cx(0, 1)
        qc.h(0)
        qc.measure([0, 1], [0, 1])
        qc.z(2).c_if(0, 1)
        qc.x(2).c_if(1, 1)
        return qc
        
    def explain_entanglement(self):
        return {
            "equations": self.equations,
            "explanation": (
                "Quantum entanglement is a physical phenomenon where particles remain connected "
                "such that the state of one particle instantly influences the state of another, "
                "regardless of distance. This connection is described by quantum states that "
                "cannot be factored into individual particle states."
            ),
            "key_points": [
                "Non-local correlations",
                "Violates classical intuition",
                "Essential for quantum computing",
                "Basis for quantum communication"
            ]
        }
