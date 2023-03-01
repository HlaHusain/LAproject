# Installation for Macbook M1 
brew install miniforge
conda create -n sklearn-env -c conda-forge scikit-learn --file requirements.txt
conda activate sklearn-env



# How to run?

conda activate sklearn-env
python ./src/main.py