

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// import './VerifyCertificate.css'; // Import the CSS file
import '../styles/VerifyCertificate.css'

const contractAddress = "0x7c23623224C1E51EC005917F482933f78c6B3894";

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
      setStatus('MetaMask not found. Please install MetaMask browser extension.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
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
    setStatus(`Generated test hash for debugging purposes`);
  };

  const verify = async () => {
    const validation = validateHash(hash);
    if (!validation.valid) {
      setStatus(`${validation.message}`);
      return;
    }

    if (!window.ethereum) {
      setStatus('MetaMask not found. Please install MetaMask.');
      return;
    }

    setIsLoading(true);
    setStatus('Verifying certificate authenticity...');
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
          setStatus('Certificate verified successfully! All details loaded.');
        } catch (detailError) {
          console.error('Error getting certificate details:', detailError);
          setStatus('Certificate exists and is valid, but detailed information is unavailable');
        }
      } else {
        setStatus('Certificate verification failed - Hash not found in registry');
      }

    } catch (err) {
      console.error("Verification error:", err);
      
      // Enhanced error handling
      if (err.message.includes('Certificate not found') || err.message.includes('incomplete')) {
        setStatus('Certificate not found - This hash has never been issued');
        setVerified(false);
      } else if (err.message.includes('Invalid hash') || err.message.includes('invalid hash')) {
        setStatus('Invalid hash format provided');
      } else if (err.message.includes('network') || err.code === 'NETWORK_ERROR') {
        setStatus('Network error - Please check your internet connection');
      } else if (err.message.includes('rejected')) {
        setStatus('Transaction rejected by user');
      } else if (err.code === 'CALL_EXCEPTION') {
        setStatus('Blockchain call failed - Certificate may not exist');
      } else {
        setStatus(`Verification error: ${err.message}`);
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
      setStatus('Address copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      setStatus('Failed to copy to clipboard');
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
    if (status.includes('')) return 'verify-status-message verify-status-success';
    if (status.includes('')) return 'verify-status-message verify-status-error';
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
    <div className="verify-certificate" style={{marginLeft: '50px', marginTop: '30px'}}>
      <div className="verify-header">
        <h1>Certificate Verification</h1>
        <p>Authenticate and validate blockchain certificates instantly</p>
      </div>

      <div className="verify-content">
        {/* Connection Status */}
        {!isMetaMaskConnected && (
          <div className="verify-status-message verify-status-error">
            <span></span>
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
                  Verify Certificate
                </>
              )}
            </button>
            
            <button 
              onClick={generateTestHash}
              disabled={isLoading} 
              className="verify-btn verify-btn-secondary"
            >
              Generate Test Hash
            </button>

            <button 
              onClick={clearForm}
              disabled={isLoading}
              className="verify-btn verify-btn-clear"
            >
              Clear Form
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
                  Certificate Verified & Authentic
                </h3>
                
                <div className="verify-issuer-info">
                  <strong>Issued by:</strong>
                  <div className="verify-address-display">
                    {issuer}
                    <button 
                      className="verify-copy-btn"
                      onClick={() => copyToClipboard(issuer)}
                    >
                      
                    </button>
                  </div>
                  <div className="verify-address-short">
                    Shortened: {formatAddress(issuer)}
                  </div>
                </div>
                
                {certificateDetails && (
                  <div className="verify-certificate-details">
                    <h4>Certificate Details</h4>
                    <div className="verify-detail-grid">
                      <div className="verify-detail-item">
                        <strong>Student Name</strong>
                        <span>{certificateDetails.studentName}</span>
                      </div>
                      <div className="verify-detail-item">
                        <strong>Course/Program</strong>
                        <span>{certificateDetails.course}</span>
                      </div>
                      <div className="verify-detail-item">
                        <strong>Issue Date</strong>
                        <span>{formatTimestamp(certificateDetails.issuedOn)}</span>
                      </div>
                      <div className="verify-detail-item">
                        <strong>Issuing Authority</strong>
                        <span>{formatAddress(certificateDetails.issuer)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3>Certificate Not Found</h3>
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






































