from abc import ABC, abstractmethod

class BaseNode(ABC):
    @abstractmethod
    def initialize(self):
        pass

    @abstractmethod
    def execute(self, payload):
        pass

    @abstractmethod
    def cleanup(self):
        pass
