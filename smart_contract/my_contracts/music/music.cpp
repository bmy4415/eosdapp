/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <music.hpp>
#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;
  
class musicDapp : public eosio::contract {
  public:
      using contract::contract;

      // @abi action

	  void addmusic( string music_name, string singer, string ipfs_hash_str, account_name identity_account ) {
		  require_auth(identity_account);
		  TABLE_Musics _musics(_self, _self);
	
		  //const char* contract_name_str = "music"; // our Dapp contract name
		  //account_name contract_name = eosio::string_to_name(contract_name_str);
	
		  hash ipfs_hash = stringToHash(ipfs_hash_str);
		  auto record = _musics.find( ipfs_hash );
		  if(record == _musics.end())
		  {
			  _musics.emplace( identity_account, [&]( auto& a ) {
					  a.music_name = music_name;
					  a.singer = singer;
					  a.ipfs_hash = ipfs_hash;
					  a.ipfs_hash_str = ipfs_hash_str;
					  a.identity_account = identity_account;
					  });
			  eosio::print("======== music added! ========\n");

		  }
		  else
		  { 
			  eosio::print("======== addmusic error ========\n");

			  eosio::print("======== ipfs hash already exist! ========\n");

		  }			 

	  }


  private:
	  /***
	   * Structs
	   ****************************************************/
	  typedef uint64_t hash;

	  // @abi table musics i64
	  struct musics {
		  hash ipfs_hash; // use this as index
		  string ipfs_hash_str;
		  string music_name;
		  string singer;
		  account_name identity_account;

		  hash primary_key()const { return ipfs_hash; }
		  
		  EOSLIB_SERIALIZE( musics, (ipfs_hash)(ipfs_hash_str)(music_name)(singer)(identity_account) )
	  };

	  static hash stringToHash(string str){
		  return std::hash<string>{}(str);
	  }

	  /***
	   * Tables
	   ****************************************************/
	
	  typedef multi_index<N(musics), musics> TABLE_Musics;

};

EOSIO_ABI( musicDapp, (addmusic) )
