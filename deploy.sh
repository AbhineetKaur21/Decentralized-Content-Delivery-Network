
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

# Start dfx in the background
echo "🔧 Starting local dfx replica..."
dfx start --background --clean

# Deploy the backend canister
echo "📦 Deploying backend canister..."
dfx deploy dcdn_backend

# Build the frontend
echo "🏗️ Building frontend..."
npm run build

# Deploy the frontend canister
echo "🌐 Deploying frontend canister..."
dfx deploy dcdn_frontend

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
