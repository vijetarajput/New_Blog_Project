import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DataBaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, image, status, userID }) {
    //I will accept slug as documentID, not taking otehr unique Id.
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, image, status, userID }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost", error);
    }
  }

  //Here, we will keep slug(our documentid for updation) separate as a first key
  // and other details as a collective object.
  async updatePost(slug, { title, content, image, status }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: daletePost", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: getPost", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    // here the status as parameter is the indexName="status" in appwrite attribute
    // to show all active status postMessage.
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
        //we can add here number of pages to be diplayed as pagination
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: getPosts", error);
      return false;
    }
  }

  //file upload service

  async uploadFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: fileUpload", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile", error);
      return false;
    }
  }

  filePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const databaseService = new DataBaseService();
export default databaseService;
