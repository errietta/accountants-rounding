#!/bin/bash
set -x #echo on

if [ ! -z "$TRAVIS_TAG" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then0i

  cd service
  npm install
  sls deploy
  cd ../frontend
  npm install
  npm run build


  aws s3 sync dist/ s3://accountants-rounding.com
  aws configure set preview.cloudfront true
  # Invalidate every object in the targeted distribution.
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

else
  echo "Skipping deployment, as this is not a tagged commit"
fi
