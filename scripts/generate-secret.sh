#!/bin/bash

# Generate a secure random secret for NextAuth
SECRET=$(openssl rand -base64 32)

echo "Generated NextAuth Secret:"
echo "$SECRET"
echo ""
echo "Add this to your .env file:"
echo "NEXTAUTH_SECRET=\"$SECRET\""
