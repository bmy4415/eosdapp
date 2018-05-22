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
		  TABLE_Musics _musics(_self, _self);

		  hash ipfs_hash = stringToHash(ipfs_hash_str);
		  auto record = _musics.find( ipfs_hash );
		  if(record == _musics.end())
		  {
			  _musics.emplace( identity_account, [&]( auto& a ) {
					  a.music_name = music_name;
					  a.singer = singer;
					  a.ipfs_hash = ipfs_hash;
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
		  string music_name;
		  string singer;
		  account_name identity_account;

		  hash primary_key()const { return ipfs_hash; }
		  
		  EOSLIB_SERIALIZE( musics, (ipfs_hash)(music_name)(singer)(identity_account) )
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
