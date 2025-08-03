class EchoMindCLI:
    def __init__(self, echomind_core):
        self.core = echomind_core
        self.session_history = []
        
    def start(self):
        print("EchoMind Quantum AI System - Secure Session")
        print(f"User: {self.core.user_id}")
        print("Type 'exit' to end session\n")
        
        while True:
            try:
                query = input("You: ")
                if query.lower() == 'exit':
                    break
                    
                response = self.core.process_query(query)
                self.display_response(response)
                self.session_history.append((query, response))
                
            except KeyboardInterrupt:
                print("\nSession terminated by user")
                break
                
    def display_response(self, response):
        if isinstance(response, dict) and 'quantum_explanation' in response:
            self._display_quantum_response(response)
        else:
            print(f"EchoMind: {response}")
            
    def _display_quantum_response(self, response):
        print("\nEchoMind Quantum Explanation:")
        print(f"- Question: {response['query']}")
        print("- Natural Language:")
        print(f"  {response['natural_explanation']}")
        print("- Quantum Equations:")
        for eq in response['quantum_equations']:
            print(f"  • {eq}")
        print("- Key Insights:")
        for insight in response['insights']:
            print(f"  • {insight}")
            
    def save_session(self, filename):
        with open(filename, 'w') as f:
            for query, response in self.session_history:
                f.write(f"User: {query}\n")
                f.write(f"EchoMind: {response}\n\n")
