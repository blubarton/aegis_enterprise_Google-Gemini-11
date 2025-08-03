from setuptools import setup, find_packages

setup(
    name='aegis_enterprise_ai',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        'torch',
        'transformers',
        'cryptography',
        'msgpack',
        'numpy',
        'pandas',
        'scikit-learn',
        'fastapi',
        'uvicorn',
        'websockets',
        'pytest'
    ],
    python_requires='>=3.8',
    description='Aegis Enterprise AI - Quantum-enhanced cognitive AI system',
    author='Your Name',
    author_email='your.email@example.com',
    url='https://github.com/yourusername/aegis-enterprise-ai',
    classifiers=[
        'Programming Language :: Python :: 3',
        'Operating System :: OS Independent',
    ],
)
