
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    address public admin;

    struct Certificate {
        bytes32 hash;
        address issuer;
        string studentName;
        string course;
        uint256 issuedOn;
    }

    // Registered schools
    mapping(address => bool) public registeredSchools;

    // Certificate hash => Certificate
    mapping(bytes32 => Certificate) public certificates;

    // Certificate hash issued?
    mapping(bytes32 => bool) public certificateExists;

    event CertificateIssued(bytes32 certHash, address indexed issuer);
    event SchoolRegistered(address indexed school);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can do this");
        _;
    }

    modifier onlySchool() {
        require(registeredSchools[msg.sender], "Not a registered school");
        _;
    }

    function registerSchool(address school) public onlyAdmin {
        registeredSchools[school] = true;
        emit SchoolRegistered(school);
    }

    function issueCertificate(
        bytes32 certHash,
        string memory studentName,
        string memory course
    ) public onlySchool {
        require(!certificateExists[certHash], "Certificate already issued");

        certificates[certHash] = Certificate({
            hash: certHash,
            issuer: msg.sender,
            studentName: studentName,
            course: course,
            issuedOn: block.timestamp
        });

        certificateExists[certHash] = true;

        emit CertificateIssued(certHash, msg.sender);
    }

    function verifyCertificate(bytes32 certHash) public view returns (bool, address) {
        Certificate memory cert = certificates[certHash];
        return (certificateExists[certHash], cert.issuer);
    }

    function getCertificate(bytes32 certHash) public view returns (
        string memory studentName,
        string memory course,
        address issuer,
        uint256 issuedOn
    ) {
        require(certificateExists[certHash], "Certificate not found");
        Certificate memory cert = certificates[certHash];
        return (cert.studentName, cert.course, cert.issuer, cert.issuedOn);
    }

    function isRegisteredSchool(address school) public view returns (bool) {
        return registeredSchools[school];
    }
}
