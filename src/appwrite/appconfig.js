import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from '../config/config.js';

export class Service {
    clint = new Client();
    database;
    bucket;

    constructor(){
        this.clint
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database = new Databases(this.clint);
        this.bucket = new Storage(this.clint);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    // userId: ID.custom(userId),
                }
            )
        
        } catch (error) {
            console.error('Error updating post:', error);
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error('Error getting post:', error);
        }
    }

    // async getPosts({limit=10, offset=0, search=''}){
    //     try {
    //         let query = new Query()
    //         query.limit(limit)
    //         query.offset(offset)
    //         query.search(search)
    //         return await this.database.listDocuments(
    //             config.appwriteDatabaseId,
    //             config.appwriteCollectionId,
    //             query
    //         )
    //     } catch (error) {
    //         console.error('Error getting posts:', error);
    //     }
    // }

    async getPosts(query=[Query.equal('status','active')]){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.error('Error getting posts:', error);
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
        console.error('Error uploading file:', error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
            // { maxWidth: 800, maxHeight: 600 }
        )
    }

}

const service = new Service();

export default service;