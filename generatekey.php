<?php
// Generate private key
$privateKey = openssl_pkey_new([
    "private_key_type" => OPENSSL_KEYTYPE_EC,
    "curve_name" => "prime256v1"  // Elliptic curve used for VAPID keys
]);

if ($privateKey === false) {
    die('Error: Unable to create private key');
}

// Export the private key
openssl_pkey_export($privateKey, $privateKeyOut);

// Get the public key
$details = openssl_pkey_get_details($privateKey);
$publicKeyOut = $details['key']; // Public key

// Display the private and public keys
echo "Private Key: \n$privateKeyOut\n\n";
echo "Public Key: \n$publicKeyOut\n";
?>
