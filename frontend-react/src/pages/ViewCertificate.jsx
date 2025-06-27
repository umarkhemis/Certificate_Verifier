

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
import '../styles/ViewCertificate.css'

const contractAddress = "0xE4CA114c095BA550E91D7449263Ce6e2F52BAdC4";

function ViewCertificate() {
  const [hash, setHash] = useState('');
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  // Check MetaMask connection on component mount
  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsMetaMaskConnected(accounts.length > 0);
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setStatus('MetaMask not found. Please install MetaMask browser extension.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsMetaMaskConnected(true);
      setStatus('MetaMask connected successfully');
    } catch (error) {
      setStatus('Failed to connect to MetaMask');
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

  const viewCertificate = async () => {
    const validation = validateHash(hash);
    if (!validation.valid) {
      setStatus(` ${validation.message}`);
      return;
    }

    if (!window.ethereum) {
      setStatus(' MetaMask not found. Please install MetaMask.');
      return;
    }

    setIsLoading(true);
    setStatus('🔍 Searching for certificate...');
    setDetails(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, CertificateRegistryABI, provider);

      console.log('Fetching certificate for hash:', hash);

      const cert = await contract.getCertificate(hash);
      
      console.log('Raw certificate data:', cert);

      // Handle BigInt timestamp conversion properly
      const timestampBigInt = cert[3];
      const timestampNumber = Number(timestampBigInt);
      const issuedOnDate = new Date(timestampNumber * 1000);

      // Validate that we got actual data (not empty strings)
      if (!cert[0] || !cert[1] || !cert[2]) {
        throw new Error('Certificate data is incomplete or invalid');
      }

      setDetails({
        studentName: cert[0],
        course: cert[1],
        issuer: cert[2],
        issuedOn: issuedOnDate.toLocaleString(),
        timestamp: timestampNumber,
        hash: hash
      });

      setStatus('Certificate found and verified successfully!');

    } catch (err) {
      console.error('Error fetching certificate:', err);
      
      // Enhanced error handling
      if (err.message.includes('Certificate not found') || err.message.includes('incomplete')) {
        setStatus('Certificate not found - This hash has not been issued or is invalid');
      } else if (err.message.includes('invalid hash')) {
        setStatus('Invalid hash format provided');
      } else if (err.message.includes('network') || err.code === 'NETWORK_ERROR') {
        setStatus('Network error - Please check your internet connection and try again');
      } else if (err.code === 'CALL_EXCEPTION') {
        setStatus('Certificate not found or blockchain error occurred');
      } else if (err.message.includes('rejected')) {
        setStatus('Transaction rejected by user');
      } else {
        setStatus(`Unexpected error: ${err.message}`);
      }
      
      setDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const generateTestHash = () => {
    const studentName = "John Doe";
    const course = "Computer Science";
    const issuer = "University of Technology";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const rawData = `${studentName}-${course}-${issuer}-${timestamp}`;
    const testHash = ethers.keccak256(ethers.toUtf8Bytes(rawData));
    
    console.log('Generated test hash:', testHash);
    console.log('Raw data used:', rawData);
    setHash(testHash);
    setStatus(`🧪 Generated test hash for debugging purposes`);
  };

  const clearForm = () => {
    setHash('');
    setDetails(null);
    setStatus('');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('📋 Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      setStatus(' Failed to copy to clipboard');
    }
  };

  const getStatusIcon = () => {
    if (status.includes('✅')) return '✅';
    if (status.includes('❌')) return '❌';
    if (status.includes('🔍')) return '🔍';
    if (status.includes('🧪')) return '🧪';
    if (status.includes('📋')) return '📋';
    return 'ℹ️';
  };

  const getStatusClass = () => {
    if (status.includes('✅')) return 'status-message status-success';
    if (status.includes('❌')) return 'status-message status-error';
    return 'status-message status-info';
  };

  return (
    <div className="certificate-viewer">
      <div className="header">
        <h1>View Certificate</h1>
        <p>Verify blockchain certificates with complete transparency</p>
      </div>

      <div className="content">
        {/* Connection Status */}
        {!isMetaMaskConnected && (
          <div className="status-message status-error">
            <span>🔗</span>
            <div>
              MetaMask not connected. 
              <button 
                onClick={connectMetaMask}
                style={{ 
                  marginLeft: '10px', 
                  padding: '4px 12px', 
                  background: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Connect Now
              </button>
            </div>
          </div>
        )}

        <div className="form-section">
          <div className="input-group">
            <label className="input-label">Certificate Hash</label>
            <input 
              className="hash-input"
              value={hash} 
              onChange={e => setHash(e.target.value)} 
              placeholder="Enter certificate hash (0x...)" 
              disabled={isLoading}
            />
          </div>
          
          <div className="button-group">
            <button 
              onClick={viewCertificate}
              disabled={isLoading || !hash.trim()}
              className="btn btn-primary"
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Searching...
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
              className="btn btn-secondary"
            >
              🧪 Generate Test Hash
            </button>
            
            <button 
              onClick={clearForm}
              disabled={isLoading}
              className="btn"
              style={{ background: '#6b7280', color: 'white' }}
            >
              🗑️ Clear
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

        {/* Certificate Details */}
        {details && (
          <div className="certificate-card">
            <h3>
              🏆 Verified Certificate
            </h3>
            
            <div className="certificate-details">
              <div className="detail-item">
                <div className="detail-label">
                  👤 Student Name
                </div>
                <div className="detail-value">{details.studentName}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  📚 Course/Program
                </div>
                <div className="detail-value">{details.course}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  🏫 Issued By
                </div>
                <div className="detail-value">
                  <div className="address-value">
                    {details.issuer}
                    <button 
                      onClick={() => copyToClipboard(details.issuer)}
                      style={{
                        marginLeft: '8px',
                        padding: '2px 6px',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      📋
                    </button>
                  </div>
                  <div className="address-short">
                    Shortened: {formatAddress(details.issuer)}
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  📅 Issue Date
                </div>
                <div className="detail-value">{details.issuedOn}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  🔗 Certificate Hash
                </div>
                <div className="detail-value">
                  <div className="address-value">
                    {details.hash}
                    <button 
                      onClick={() => copyToClipboard(details.hash)}
                      style={{
                        marginLeft: '8px',
                        padding: '2px 6px',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Debug Information */}
        <div className="debug-info">
          <h4>🔧 Debug Information</h4>
          <div className="debug-item">
            <span className="debug-label">Contract Address:</span>
            <span className="debug-value">{contractAddress}</span>
          </div>
          <div className="debug-item">
            <span className="debug-label">Hash Length:</span>
            <span className="debug-value">{hash.length} characters</span>
          </div>
          <div className="debug-item">
            <span className="debug-label">Valid Format:</span>
            <span className="debug-value">
              {hash.startsWith('0x') && hash.length === 66 ? '✅ Valid' : '❌ Invalid'}
            </span>
          </div>
          <div className="debug-item">
            <span className="debug-label">MetaMask Status:</span>
            <span className="debug-value">
              {window.ethereum ? (isMetaMaskConnected ? '✅ Connected' : '⚠️ Not Connected') : '❌ Not Installed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCertificate;



































// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';

// const contractAddress = "0x2139e69391C23730DACB61f8f3Ee90e99fF8C956";

// function ViewCertificate() {
//   const [hash, setHash] = useState('');
//   const [details, setDetails] = useState(null);
//   const [status, setStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const viewCertificate = async () => {
//     if (!hash) {
//       setStatus('❌ Please enter a certificate hash');
//       return;
//     }

//     if (!window.ethereum) {
//       setStatus('❌ MetaMask not found. Please install MetaMask.');
//       return;
//     }

//     setIsLoading(true);
//     setStatus('🔍 Loading certificate details...');
//     setDetails(null);

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const contract = new ethers.Contract(contractAddress, CertificateRegistryABI, provider);

//       console.log('Fetching certificate for hash:', hash);

//       const cert = await contract.getCertificate(hash);
      
//       console.log('Raw certificate data:', cert);

//       // Handle BigInt timestamp conversion properly
//       const timestampBigInt = cert[3];
//       const timestampNumber = Number(timestampBigInt);
//       const issuedOnDate = new Date(timestampNumber * 1000);

//       setDetails({
//         studentName: cert[0],
//         course: cert[1],
//         issuer: cert[2],
//         issuedOn: issuedOnDate.toLocaleString(),
//         timestamp: timestampNumber
//       });

//       setStatus('✅ Certificate details loaded successfully');

//     } catch (err) {
//       console.error('Error fetching certificate:', err);
      
//       // Handle specific error cases
//       if (err.message.includes('Certificate not found')) {
//         setStatus('❌ Certificate not found - This hash has never been issued');
//       } else if (err.message.includes('invalid hash')) {
//         setStatus('❌ Invalid hash format');
//       } else if (err.message.includes('network')) {
//         setStatus('❌ Network error - Please check your connection');
//       } else if (err.code === 'CALL_EXCEPTION') {
//         setStatus('❌ Certificate not found or invalid hash');
//       } else {
//         setStatus(`❌ Error: ${err.message}`);
//       }
      
//       setDetails(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to format address
//   const formatAddress = (address) => {
//     if (!address) return '';
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   // Generate test hash for debugging
//   const generateTestHash = () => {
//     const studentName = "John Doe";
//     const course = "Computer Science";
//     const timestamp = Date.now().toString();
//     const rawData = `${studentName}-${course}-${timestamp}`;
//     const testHash = ethers.keccak256(ethers.toUtf8Bytes(rawData));
    
//     console.log('Generated test hash:', testHash);
//     setHash(testHash);
//     setStatus(`Generated test hash: ${testHash}`);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h2>📜 View Certificate Details</h2>
      
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
//             onClick={viewCertificate}
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
//             {isLoading ? 'Loading...' : 'View Certificate'}
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

//       {/* Certificate Details */}
//       {details && (
//         <div style={{ 
//           padding: '20px', 
//           border: '1px solid #28a745', 
//           borderRadius: '4px',
//           backgroundColor: '#d4edda'
//         }}>
//           <h3>📋 Certificate Details</h3>
//           <div style={{ marginTop: '15px' }}>
//             <p><strong>👤 Student Name:</strong> {details.studentName}</p>
//             <p><strong>📚 Course:</strong> {details.course}</p>
//             <p><strong>🏫 Issued By:</strong> 
//               <br />
//               <span style={{ fontFamily: 'monospace', fontSize: '0.9em' }}>
//                 {details.issuer}
//               </span>
//               <br />
//               <small style={{ color: '#666' }}>({formatAddress(details.issuer)})</small>
//             </p>
//             <p><strong>📅 Issued On:</strong> {details.issuedOn}</p>
//             <p><strong>🔢 Timestamp:</strong> {details.timestamp}</p>
//           </div>
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
//         <p><strong>Contract Address:</strong> {contractAddress}</p>
//         <p><strong>Hash Length:</strong> {hash.length} characters</p>
//         <p><strong>Valid Hash Format:</strong> {hash.startsWith('0x') && hash.length === 66 ? '✅' : '❌'}</p>
//       </div>
//     </div>
//   );
// }

// export default ViewCertificate;









































// import React, { useState } from 'react';
// import { ethers } from 'ethers';
// // import CertificateRegistryABI from '../abis/CertificateRegistry.json';
// import { createRoutesFromChildren } from 'react-router-dom';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// const contractAddress = "0x2139e69391C23730DACB61f8f3Ee90e99fF8C956";

// function ViewCertificate() {
//   const [hash, setHash] = useState('');
//   const [details, setDetails] = useState(null);

//   const viewCertificate = async () => {
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const contract = new ethers.Contract(contractAddress, CertificateRegistryABI, provider);

//       const cert = await contract.getCertificate(hash);
//       setDetails({
//         studentName: cert[0],
//         course: cert[1],
//         issuer: cert[2],
//         issuedOn: new Date(cert[3] * 1000).toLocaleString(),
//       });
//     } catch (err) {
//       console.error(err);
//       setDetails(null);
//     }
//   };

//   return (
//     <div>
//       <h2>View Certificate</h2>
//       <input value={hash} onChange={e => setHash(e.target.value)} placeholder="Certificate Hash" />
//       <button onClick={viewCertificate}>View</button>
//       {details && (
//         <div>
//           <p><strong>Student:</strong> {details.studentName}</p>
//           <p><strong>Course:</strong> {details.course}</p>
//           <p><strong>Issuer:</strong> {details.issuer}</p>
//           <p><strong>Issued On:</strong> {details.issuedOn}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewCertificate;
