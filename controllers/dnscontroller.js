import { DefaultAzureCredential } from '@azure/identity';
import { DnsManagementClient } from '@azure/arm-dns';
import dotenv from "dotenv";

dotenv.config({
    path:"./data/config.env",
});

const credential = new DefaultAzureCredential();
const dnsClient = new DnsManagementClient(credential, process.env.AZURE_SUBSCRIPTION_ID);

// Get all DNS
export const GetAllDns = async (req, res) => {
    const domain = req.params.domain;

    try {
      const records = await dnsClient.recordSets.listAllByDnsZone(process.env.AZURE_RESOURCE_GROUP, domain);
      res.json(records);
    } catch (error) {
      console.error('Error fetching DNS records:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};

// ADD DNS
export const AddDns = async (req, res) => {
    const domain = req.params.domain;
    const record = req.body;
  
    try {
      const result = await dnsClient.recordSets.createOrUpdate(process.env.AZURE_RESOURCE_GROUP, domain, record.name, 'A', {
        ttl: record.ttl,
        aRecords: [{ ipv4Address: record.ipv4Address }]
      });
      res.json(result);
    } catch (error) {
      console.error('Error adding DNS record:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};


// Update DNS
export const UpdateDns = async (req, res) => {
    const domain = req.params.domain;
    const recordName = req.params.recordName;
    const record = req.body;
  
    try {
      const result = await dnsClient.recordSets.createOrUpdate(process.env.AZURE_RESOURCE_GROUP, domain, recordName, 'A', {
        ttl: record.ttl,
        aRecords: [{ ipv4Address: record.ipv4Address }]
      });
      res.json(result);
    } catch (error) {
      console.error('Error updating DNS record:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};


// DELETE DNS
export const DeleteDns = async (req, res) => {
    const domain = req.params.domain;
    const recordName = req.params.recordName;
  
    try {
      await dnsClient.recordSets.deleteMethod(process.env.AZURE_RESOURCE_GROUP, domain, recordName, 'A');
      res.json({ message: 'DNS record deleted successfully' });
    } catch (error) {
      console.error('Error deleting DNS record:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};
