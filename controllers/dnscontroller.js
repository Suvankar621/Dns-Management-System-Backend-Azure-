import axios from "axios";
import dotenv from "dotenv";
import { GenerateAuthToken } from "../utils/features.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

dotenv.config({
  path: "./data/config.env",
});

// Get All Dns
//////////////////////////////////////////////////////////////////
export const GetAllDns = async (req, res) => {

  try {
    
    const {token}=req.cookies;
    if(!token){
      return res.status(404).json({
        success:false,
        message:"Invalid Credentials"
    })
    }

  const decoadeddata=await jwt.verify(token,process.env.JWT_SECRET);
  const user=await User.findById(decoadeddata._id);
  // console.log(user);
    // const { tenantId, clientid, client_secret } =
    //   await req.user;
    // const { AZURE_RESOURCE_GROUP, ZONE } = req.body;

    // const atoken = await GenerateAuthToken(
    //   user.tenantId,
    //   user.clientid,
    //   user.client_secret,
    //   "https://management.azure.com/"
    // );
    // const authtoken = `Bearer ${atoken}`;

    // const URL = `https://management.azure.com/subscriptions/${user.subscriptionid}/resourceGroups/${AZURE_RESOURCE_GROUP}/providers/Microsoft.Network/dnsZones/${ZONE}/all?api-version=2018-05-01`;
    // // Generating AuthToken

    // ///////////////////////////////////////

    // const { data } = await axios.get(URL, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: authtoken,
    //   },
    // });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send("Invalid Credentials");
  }
};
//////////////////////////////////////////////////////////////


// ADD DNS
/////////////////////////////////////////////////////////////

export const AddDns = async (req, res) => {
  const { recordType, recordName, AZURE_RESOURCE_GROUP, ZONE } = req.body;

  const { tenantId, clientid, client_secret, subscriptionid } = await req.user;

  const token = await GenerateAuthToken(
    tenantId,
    clientid,
    client_secret,
    "https://management.azure.com/"
  );
  const authtoken = `Bearer ${token}`;

  const URL = `https://management.azure.com/subscriptions/${subscriptionid}/resourceGroups/${AZURE_RESOURCE_GROUP}/providers/Microsoft.Network/dnsZones/${ZONE}/${recordType}/${recordName}?api-version=2018-05-01`;

  try {
    // Request body
    const requestBody = {
      properties: {
        metadata: {
          key1: "value1",
        },
        TTL: 3600,
        ARecords: [
          {
            ipv4Address: "127.0.0.1",
          },
        ],
      },
    };

    // Make the PUT request
    const { data } = await axios.put(URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authtoken,
      },
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////

// Update DNS
/////////////////////////////////////////////////////////////////////
export const UpdateDns = async (req, res) => {
  const { recordType, recordName, AZURE_RESOURCE_GROUP, ZONE } = req.body;

  const { tenantId, clientid, client_secret, subscriptionid } = await req.user;

  const token = await GenerateAuthToken(
    tenantId,
    clientid,
    client_secret,
    "https://management.azure.com/"
  );
  const authtoken = `Bearer ${token}`;

  const URL = `https://management.azure.com/subscriptions/${subscriptionid}/resourceGroups/${AZURE_RESOURCE_GROUP}/providers/Microsoft.Network/dnsZones/${ZONE}/${recordType}/${recordName}?api-version=2018-05-01`;

  try {
    // Request body
    const requestBody = {
      properties: {
        metadata: {
          key1: "value1",
        },
        TTL: 3600,
        ARecords: [
          {
            ipv4Address: "127.0.0.1",
          },
        ],
      },
    };

    // Make the PUT request
    const { data } = await axios.put(URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authtoken,
      },
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
//////////////////////////////////////////////////////////////////////


// DELETE DNS
///////////////////////////////////////////////////////////////
export const DeleteDns = async (req, res) => {
  try {
    const { recordType, recordName, AZURE_RESOURCE_GROUP, ZONE } = req.body;

    const { tenantId, clientid, client_secret, subscriptionid } =
      await req.user;

    const token = await GenerateAuthToken(
      tenantId,
      clientid,
      client_secret,
      "https://management.azure.com/"
    );
    const authtoken = `Bearer ${token}`;

    const URL = `https://management.azure.com/subscriptions/${subscriptionid}/resourceGroups/${AZURE_RESOURCE_GROUP}/providers/Microsoft.Network/dnsZones/${ZONE}/${recordType}/${recordName}?api-version=2018-05-01`;

    await axios.delete(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authtoken,
      },
    });

    res.status(200).json({
      success: true,
      message: "Deleted Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
/////////////////////////////////////////////////////////////