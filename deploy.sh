
#!/bin/bash

echo "🚀 Starting dCDN Deployment to Internet Computer..."

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "❌ dfx not found. Please install the DFINITY SDK first."
    echo "Run: sh -ci \"$(curl -fsSL https://sdk.dfinity.org/install.sh)\""
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js and npm first."
    exit 1
fi

# Stop any existing dfx processes
echo "🛑 Stopping any existing dfx processes..."
dfx stop

# Start dfx in the background with clean state
echo "🔧 Starting local dfx replica..."
dfx start --background --clean

# Wait a moment for dfx to fully start
sleep 5

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Deploy the backend canister first
echo "📦 Deploying backend canister..."
dfx deploy dcdn_backend

# Check if backend deployment was successful
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed. Check the error messages above."
    exit 1
fi

# Build the frontend
echo "🏗️ Building frontend..."
npm run build

# Check if frontend build was successful
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed. Check the error messages above."
    exit 1
fi

# Deploy the frontend canister
echo "🌐 Deploying frontend canister..."
dfx deploy dcdn_frontend

# Check if frontend deployment was successful
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed. Check the error messages above."
    exit 1
fi

# Get canister URLs
echo "✅ Deployment successful!"
echo ""
echo "📍 Your dCDN application is now deployed:"
echo "Backend Canister: $(dfx canister id dcdn_backend)"
echo "Frontend URL: http://127.0.0.1:4943/?canisterId=$(dfx canister id dcdn_frontend)"
echo ""
echo "🌍 To deploy to mainnet, run:"
echo "dfx deploy --network ic"
echo ""
echo "🎉 dCDN is ready to use!"
