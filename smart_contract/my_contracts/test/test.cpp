/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <test.hpp>
#include <eosiolib/eosio.hpp>
  
class test : public eosio::contract {
  public:
      using contract::contract;

      // @abi action
      void testfunc( account_name from, account_name to, uint64_t amount ) {
         auto header = "======== testfunc ========";
         eosio::print( header, "\n" );
         eosio::print( "from = ", from, "  to = ", to, "  amount = ", amount, "\n" );
         eosio::print( "from = ", eosio::name{from}, "  to = ", eosio::name{to}, "  amount = ", amount, "\n" );
      }
};

EOSIO_ABI( test, (testfunc) )
