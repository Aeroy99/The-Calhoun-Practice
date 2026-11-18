import { PasskeyManager as PasskeyManager_e3b6222c3828bb025fe656ba2c1ae063 } from '../../../admin/PasskeyManager'
import { TOTPField as TOTPField_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { PasskeyLogin as PasskeyLogin_dfe273060e164266996d5a47d67a4bd5 } from '../../../admin/PasskeyLogin'
import { TOTPProvider as TOTPProvider_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { TOTPSetup as TOTPSetup_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { TOTPVerify as TOTPVerify_4eaf6cb33cfb75be01716613e3c9a512 } from 'payload-totp/rsc'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_a8c7d4e2f1b9a6c3e5d2b8f4a7c1e9d3 } from '@payloadcms/storage-vercel-blob/client'

/** @type import('payload').ImportMap */
export const importMap = {
  "/admin/PasskeyManager#PasskeyManager": PasskeyManager_e3b6222c3828bb025fe656ba2c1ae063,
  "payload-totp/rsc#TOTPField": TOTPField_4eaf6cb33cfb75be01716613e3c9a512,
  "/admin/PasskeyLogin#PasskeyLogin": PasskeyLogin_dfe273060e164266996d5a47d67a4bd5,
  "payload-totp/rsc#TOTPProvider": TOTPProvider_4eaf6cb33cfb75be01716613e3c9a512,
  "payload-totp/rsc#TOTPSetup": TOTPSetup_4eaf6cb33cfb75be01716613e3c9a512,
  "payload-totp/rsc#TOTPVerify": TOTPVerify_4eaf6cb33cfb75be01716613e3c9a512,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_a8c7d4e2f1b9a6c3e5d2b8f4a7c1e9d3
}
