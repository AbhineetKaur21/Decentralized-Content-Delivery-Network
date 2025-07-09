
#!/bin/bash

echo "🌍 Deploying dCDN to Internet Computer Mainnet..."

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "❌ dfx not found. Please install the DFINITY SDK first."
    exit 1
fi

# Check if user has cycles
echo "💰 Checking cycles balance..."
dfx wallet --network ic balance

# Build the frontend
echo "🏗️ Building frontend for production..."
npm run build

# Deploy to mainnet
echo "🚀 Deploying to mainnet (this may take a few minutes)..."
dfx deploy --network ic --with-cycles 1000000000000

# Get canister URLs
echo "✅ Mainnet deployment successful!"
echo ""
echo "📍 Your dCDN application is now live on the Internet Computer:"
echo "Backend Canister: $(dfx canister --network ic id dcdn_backend)"
echo "Frontend URL: https://$(dfx canister --network ic id dcdn_frontend).ic0.app"
echo ""
echo "🎉 Your dCDN is now running on the decentralized web!"
echo "Share your application with the world: https://$(dfx canister --network ic id dcdn_frontend).ic0.app"
