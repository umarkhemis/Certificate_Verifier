

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// import './VerifyCertificate.css'; // Import the CSS file
import '../styles/VerifyCertificate.css'

const contractAddress = "0xE4CA114c095BA550E91D7449263Ce6e2F52BAdC4";

function VerifyCertificate() {
  const [hash, setHash] = useState('');
  const [verified, setVerified] = useState(null);
  const [issuer, setIssuer] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [web3, setWeb3] = useState(null);

  // Check MetaMask connection on component mount
  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsMetaMaskConnected(accounts.length > 0);
        if (accounts.length > 0) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setStatus('❌ MetaMask not found. Please install MetaMask browser extension.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setIsMetaMaskConnected(true);
      setStatus('✅ MetaMask connected successfully');
    } catch (error) {
      setStatus('❌ Failed to connect to MetaMask');
      console.error('MetaMask connection error:', error);
    }
  };

  const validateHash = (inputHash) => {
    if (!inputHash) return { valid: false, message: 'Hash cannot be empty' };
    if (!inputHash.startsWith('0x')) return { valid: false, message: 'Hash must start with 0x' };
    if (inputHash.length !== 66) return { valid: false, message: 'Hash must be 66 characters long (including 0x)' };
    if (!/^0x[a-fA-F0-9]{64}$/.test(inputHash)) return { valid: false, message: 'Hash contains invalid characters' };
    return { valid: true };
  };

  const generateTestHash = () => {
    const web3Instance = web3 || new Web3();
    const studentName = "John Doe";
    const course = "Computer Science";
    const issuer = "University of Technology";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const rawData = `${studentName}-${course}-${issuer}-${timestamp}`;
    const testHash = web3Instance.utils.keccak256(rawData);
    
    console.log('Generated test hash:', testHash);
    console.log('Raw data used:', rawData);
    setHash(testHash);
    setStatus(`🧪 Generated test hash for debugging purposes`);
  };

  const verify = async () => {
    const validation = validateHash(hash);
    if (!validation.valid) {
      setStatus(`❌ ${validation.message}`);
      return;
    }

    if (!window.ethereum) {
      setStatus('❌ MetaMask not found. Please install MetaMask.');
      return;
    }

    setIsLoading(true);
    setStatus('🔍 Verifying certificate authenticity...');
    setVerified(null);
    setIssuer(null);
    setCertificateDetails(null);

    try {
      const web3Instance = web3 || new Web3(window.ethereum);
      const contract = new web3Instance.eth.Contract(CertificateRegistryABI, contractAddress);

      console.log('Verifying hash:', hash);

      // First, check if certificate exists using the simple verification
      const verifyResult = await contract.methods.verifyCertificate(hash).call();
      const exists = verifyResult[0];
      const certIssuer = verifyResult[1];

      console.log('Verification result:', { exists, certIssuer });

      setVerified(exists);
      setIssuer(certIssuer);

      if (exists) {
        // If certificate exists, get full details
        try {
          const details = await contract.methods.getCertificate(hash).call();
          
          // Validate that we got actual data
          if (!details[0] || !details[1] || !details[2]) {
            throw new Error('Certificate data is incomplete');
          }

          setCertificateDetails({
            studentName: details[0],
            course: details[1],
            issuer: details[2],
            issuedOn: details[3],
            hash: hash
          });
          setStatus('✅ Certificate verified successfully! All details loaded.');
        } catch (detailError) {
          console.error('Error getting certificate details:', detailError);
          setStatus('✅ Certificate exists and is valid, but detailed information is unavailable');
        }
      } else {
        setStatus('❌ Certificate verification failed - Hash not found in registry');
      }

    } catch (err) {
      console.error("Verification error:", err);
      
      // Enhanced error handling
      if (err.message.includes('Certificate not found') || err.message.includes('incomplete')) {
        setStatus('❌ Certificate not found - This hash has never been issued');
        setVerified(false);
      } else if (err.message.includes('Invalid hash') || err.message.includes('invalid hash')) {
        setStatus('❌ Invalid hash format provided');
      } else if (err.message.includes('network') || err.code === 'NETWORK_ERROR') {
        setStatus('❌ Network error - Please check your internet connection');
      } else if (err.message.includes('rejected')) {
        setStatus('❌ Transaction rejected by user');
      } else if (err.code === 'CALL_EXCEPTION') {
        setStatus('❌ Blockchain call failed - Certificate may not exist');
      } else {
        setStatus(`❌ Verification error: ${err.message}`);
      }
      
      setVerified(null);
      setIssuer(null);
      setCertificateDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('📋 Address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      setStatus('❌ Failed to copy to clipboard');
    }
  };

  const clearForm = () => {
    setHash('');
    setVerified(null);
    setIssuer(null);
    setCertificateDetails(null);
    setStatus('');
  };

  const getStatusClass = () => {
    if (status.includes('✅')) return 'verify-status-message verify-status-success';
    if (status.includes('❌')) return 'verify-status-message verify-status-error';
    return 'verify-status-message verify-status-info';
  };

  const getStatusIcon = () => {
    if (status.includes('✅')) return '✅';
    if (status.includes('❌')) return '❌';
    if (status.includes('🔍')) return '🔍';
    if (status.includes('🧪')) return '🧪';
    if (status.includes('📋')) return '📋';
    return 'ℹ️';
  };

  return (
    <div className="verify-certificate">
      <div className="verify-header">
        <h1>🔍 Certificate Verification</h1>
        <p>Authenticate and validate blockchain certificates instantly</p>
      </div>

      <div className="verify-content">
        {/* Connection Status */}
        {!isMetaMaskConnected && (
          <div className="verify-status-message verify-status-error">
            <span>🔗</span>
            <div>
              MetaMask not connected. 
              <button 
                onClick={connectMetaMask}
                style={{ 
                  marginLeft: '12px', 
                  padding: '6px 14px', 
                  background: '#e53e3e', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Connect Now
              </button>
            </div>
          </div>
        )}

        <div className="verify-form-section">
          <div className="verify-input-group">
            <label className="verify-input-label">Certificate Hash</label>
            <input
              className="verify-hash-input"
              value={hash}
              onChange={e => setHash(e.target.value)}
              placeholder="Enter certificate hash (0x...)"
              disabled={isLoading}
            />
          </div>
          
          <div className="verify-button-group">
            <button 
              onClick={verify} 
              disabled={isLoading || !hash.trim()}
              className="verify-btn verify-btn-primary"
            >
              {isLoading ? (
                <>
                  <span className="verify-loading-spinner"></span>
                  Verifying...
                </>
              ) : (
                <>
                  🔍 Verify Certificate
                </>
              )}
            </button>
            
            <button 
              onClick={generateTestHash}
              disabled={isLoading} 
              className="verify-btn verify-btn-secondary"
            >
              🧪 Generate Test Hash
            </button>

            <button 
              onClick={clearForm}
              disabled={isLoading}
              className="verify-btn verify-btn-clear"
            >
              🗑️ Clear Form
            </button>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={getStatusClass()}>
            <span>{getStatusIcon()}</span>
            <span>{status}</span>
          </div>
        )}

        {/* Verification Results */}
        {verified !== null && (
          <div className={`verify-results-card ${verified ? 'verify-results-verified' : 'verify-results-not-verified'}`}>
            {verified ? (
              <div>
                <h3>
                  ✅ Certificate Verified & Authentic
                </h3>
                
                <div className="verify-issuer-info">
                  <strong>Issued by:</strong>
                  <div className="verify-address-display">
                    {issuer}
                    <button 
                      className="verify-copy-btn"
                      onClick={() => copyToClipboard(issuer)}
                    >
                      📋
                    </button>
                  </div>
                  <div className="verify-address-short">
                    Shortened: {formatAddress(issuer)}
                  </div>
                </div>
                
                {certificateDetails && (
                  <div className="verify-certificate-details">
                    <h4>📋 Certificate Details</h4>
                    <div className="verify-detail-grid">
                      <div className="verify-detail-item">
                        <strong>👤 Student Name</strong>
                        <span>{certificateDetails.studentName}</span>
                      </div>
                      <div className="verify-detail-item">
                        <strong>📚 Course/Program</strong>
                        <span>{certificateDetails.course}</span>
                      </div>
                      <div className="verify-detail-item">
                        <strong>📅 Issue Date</strong>
                        <span>{formatTimestamp(certificateDetails.issuedOn)}</span>
                      </div>
                      <div className="verify-detail-item">
                        <strong>🏫 Issuing Authority</strong>
                        <span>{formatAddress(certificateDetails.issuer)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3>❌ Certificate Not Found</h3>
                <p>This certificate hash does not exist in our blockchain registry.</p>
                
                <div className="verify-not-found-reasons">
                  <h4>Potential Causes:</h4>
                  <ul>
                    <li>The certificate has not been issued.</li>
                    <li>The entered hash is mistyped or invalid.</li>
                    <li>There might be a network synchronization delay.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyCertificate;









































// import React, { useState } from 'react';
// import Web3 from 'web3';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';

// const contractAddress = "0x2139e69391C23730DACB61f8f3Ee90e99fF8C956";

// function VerifyCertificate() {
//   const [hash, setHash] = useState('');
//   const [verified, setVerified] = useState(null);
//   const [issuer, setIssuer] = useState(null);
//   const [certificateDetails, setCertificateDetails] = useState(null);
//   const [status, setStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Test hash generator to help debug
//   const generateTestHash = () => {
//     const web3 = new Web3();
//     const studentName = "John Doe";
//     const course = "Computer Science";
//     const timestamp = Date.now().toString();
//     const rawData = `${studentName}-${course}-${timestamp}`;
//     const testHash = web3.utils.keccak256(rawData);
    
//     console.log('Generated test hash:', testHash);
//     setHash(testHash);
//     setStatus(`Generated test hash: ${testHash}`);
//   };

//   const verify = async () => {
//     if (!hash) {
//       setStatus('❌ Please enter a certificate hash');
//       return;
//     }

//     if (!window.ethereum) {
//       alert("MetaMask not found. Please install MetaMask.");
//       return;
//     }

//     setIsLoading(true);
//     setStatus('🔍 Verifying certificate...');
//     setVerified(null);
//     setIssuer(null);
//     setCertificateDetails(null);

//     try {
//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

//       console.log('Verifying hash:', hash);

//       // First, check if certificate exists using the simple verification
//       const verifyResult = await contract.methods.verifyCertificate(hash).call();
//       const exists = verifyResult[0];
//       const certIssuer = verifyResult[1];

//       console.log('Verification result:', { exists, certIssuer });

//       setVerified(exists);
//       setIssuer(certIssuer);

//       if (exists) {
//         // If certificate exists, get full details
//         try {
//           const details = await contract.methods.getCertificate(hash).call();
//           setCertificateDetails({
//             studentName: details[0],
//             course: details[1],
//             issuer: details[2],
//             issuedOn: details[3]
//           });
//           setStatus('✅ Certificate verification complete');
//         } catch (detailError) {
//           console.error('Error getting certificate details:', detailError);
//           setStatus('✅ Certificate exists but details unavailable');
//         }
//       } else {
//         setStatus('❌ Certificate not found');
//       }

//     } catch (err) {
//       console.error("Verification error:", err);
      
//       // Handle specific error cases
//       if (err.message.includes('Certificate not found')) {
//         setStatus('❌ Certificate not found - This hash has never been issued');
//         setVerified(false);
//       } else if (err.message.includes('Invalid hash')) {
//         setStatus('❌ Invalid hash format');
//       } else if (err.message.includes('network')) {
//         setStatus('❌ Network error - Please check your connection');
//       } else {
//         setStatus(`❌ Verification error: ${err.message}`);
//       }
      
//       setVerified(null);
//       setIssuer(null);
//       setCertificateDetails(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to format timestamp
//   const formatTimestamp = (timestamp) => {
//     return new Date(parseInt(timestamp) * 1000).toLocaleString();
//   };

//   // Helper function to format address
//   const formatAddress = (address) => {
//     if (!address) return '';
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h2>🔍 Verify Certificate</h2>
      
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           style={{
//             width: '100%',
//             padding: '10px',
//             marginBottom: '10px',
//             border: '1px solid #ddd',
//             borderRadius: '4px',
//             fontFamily: 'monospace'
//           }}
//           value={hash}
//           onChange={e => setHash(e.target.value)}
//           placeholder="Enter Certificate Hash (0x...)"
//           required
//         />
        
//         <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//           <button 
//             onClick={verify} 
//             disabled={isLoading}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: isLoading ? '#ccc' : '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: isLoading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             {isLoading ? 'Verifying...' : 'Verify Certificate'}
//           </button>
          
//           <button 
//             onClick={generateTestHash}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Generate Test Hash
//           </button>
//         </div>
//       </div>

//       {/* Status Message */}
//       {status && (
//         <div style={{ 
//           padding: '10px', 
//           marginBottom: '20px',
//           backgroundColor: status.includes('✅') ? '#d4edda' : status.includes('❌') ? '#f8d7da' : '#d1ecf1',
//           border: '1px solid',
//           borderColor: status.includes('✅') ? '#c3e6cb' : status.includes('❌') ? '#f5c6cb' : '#bee5eb',
//           borderRadius: '4px'
//         }}>
//           {status}
//         </div>
//       )}

//       {/* Verification Results */}
//       {verified !== null && (
//         <div style={{ 
//           padding: '20px', 
//           border: '1px solid #ddd', 
//           borderRadius: '4px',
//           backgroundColor: verified ? '#d4edda' : '#f8d7da'
//         }}>
//           {verified ? (
//             <div>
//               <h3>✅ Certificate Verified</h3>
//               <p><strong>Issued by:</strong> {formatAddress(issuer)} <br/>
//                  <small style={{ color: '#666' }}>({issuer})</small>
//               </p>
              
//               {certificateDetails && (
//                 <div style={{ marginTop: '15px' }}>
//                   <h4>Certificate Details:</h4>
//                   <p><strong>Student:</strong> {certificateDetails.studentName}</p>
//                   <p><strong>Course:</strong> {certificateDetails.course}</p>
//                   <p><strong>Issued On:</strong> {formatTimestamp(certificateDetails.issuedOn)}</p>
//                   <p><strong>Issuer:</strong> {formatAddress(certificateDetails.issuer)}</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div>
//               <h3>❌ Certificate Not Found</h3>
//               <p>This certificate hash does not exist in our registry.</p>
//               <p><strong>Possible reasons:</strong></p>
//               <ul>
//                 <li>The hash was never issued</li>
//                 <li>The hash was entered incorrectly</li>
//                 <li>The certificate was issued on a different network</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Debug Information */}
//       <div style={{ 
//         marginTop: '20px', 
//         padding: '15px', 
//         backgroundColor: '#f8f9fa', 
//         border: '1px solid #e9ecef',
//         borderRadius: '4px',
//         fontSize: '14px'
//       }}>
//         <h4>Debug Info:</h4>
//         <p><strong>Contract:</strong> {contractAddress}</p>
//         <p><strong>Hash Length:</strong> {hash.length} characters</p>
//         <p><strong>Valid Hash Format:</strong> {hash.startsWith('0x') && hash.length === 66 ? '✅' : '❌'}</p>
//       </div>
//     </div>
//   );
// }

// export default VerifyCertificate;













































// import React, { useState } from 'react';
// import Web3 from 'web3';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';

// const contractAddress = "0xCA4dAc2bE9F5bF0865ec5Ed0de830045933D2b4D";

// function VerifyCertificate() {
//   const [hash, setHash] = useState('');
//   const [verified, setVerified] = useState(null);
//   const [issuer, setIssuer] = useState(null);

//     //   const verify = async () => {
//     //     if (!window.ethereum) {
//     //       alert("MetaMask not found. Please install MetaMask.");
//     //       return;
//     //     }

//     //     try {
//     //       const web3 = new Web3(window.ethereum);
//     //       const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

//     //       const result = await contract.methods.verifyCertificate(hash).call();
//     //       const [exists, certIssuer] = result;

//     //       setVerified(exists);
//     //       setIssuer(certIssuer);
//     //     } catch (err) {
//     //       console.error("Verification error:", err);
//     //       setVerified(null);
//     //       setIssuer(null);
//     //     }
//     //   };





//     const verify = async () => {
//         if (!window.ethereum) {
//             alert("MetaMask not found. Please install MetaMask.");
//             return;
//         }

//         try {
//             const web3 = new Web3(window.ethereum);
//             const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

//             const result = await contract.methods.verifyCertificate(hash).call();

//             // web3.js returns an object like {0: exists, 1: issuer}
//             const exists = result[0];
//             const certIssuer = result[1];

//             setVerified(exists);
//             setIssuer(certIssuer);
//         } catch (err) {
//             console.error("Verification error:", err);
//             setVerified(null);
//             setIssuer(null);
//         }
//     };








//   return (
//     <div>
//       <h2>Verify Certificate</h2>
//       <input
//         value={hash}
//         onChange={e => setHash(e.target.value)}
//         placeholder="Certificate Hash"
//         required
//       />
//       <button onClick={verify}>Verify</button>

//       {verified !== null && (
//         <div>
//           {verified ? (
//             <p>✅ Valid Certificate.<br />📜 Issued by: <code>{issuer}</code></p>
//           ) : (
//             <p>❌ Invalid Certificate.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyCertificate;
































// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// // import CertificateRegistryABI from '../abis/CertificateRegistry.json';

// const contractAddress = "0xCA4dAc2bE9F5bF0865ec5Ed0de830045933D2b4D";

// function VerifyCertificate() {
//   const [hash, setHash] = useState('');
//   const [verified, setVerified] = useState(null);
//   const [issuer, setIssuer] = useState(null);

//   const verify = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const contract = new ethers.Contract(contractAddress, CertificateRegistryABI, provider);

//       const [exists, certIssuer] = await contract.verifyCertificate(hash);
//       setVerified(exists);
//       setIssuer(certIssuer);
//     } catch (err) {
//       console.error(err);
//       setVerified(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Verify Certificate</h2>
//       <input value={hash} onChange={e => setHash(e.target.value)} placeholder="Certificate Hash" />
//       <button onClick={verify}>Verify</button>
//       {verified !== null && (
//         <div>
//           {verified ? (
//             <p>✅ Valid Certificate. Issuer: {issuer}</p>
//           ) : (
//             <p>❌ Invalid Certificate.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyCertificate;
