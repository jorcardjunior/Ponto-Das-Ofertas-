const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Testing sale.count...');
    const count = await p.sale.count();
    console.log('SUCCESS: count =', count);

    console.log('Testing sale.aggregate...');
    const agg = await p.sale.aggregate({ _sum: { price: true } });
    console.log('SUCCESS: aggregate =', JSON.stringify(agg));
    console.log('_sum.price =', agg._sum.price);
    console.log('Number(price) =', Number(agg._sum.price ?? 0));

    console.log('Testing sale.findMany...');
    const sales = await p.sale.findMany({
      take: 5,
      select: { price: true, quantity: true, date: true, productId: true },
    });
    console.log('SUCCESS: found', sales.length, 'sales');
    console.log('First sale:', JSON.stringify(sales[0]));

    console.log('Testing product.findMany...');
    const products = await p.product.findMany({
      take: 5,
      select: { id: true, costPrice: true, marketplaceFee: true },
    });
    console.log('SUCCESS: found', products.length, 'products');
    console.log('First product:', JSON.stringify(products[0]));
  } catch (e) {
    console.error('ERROR:', e.message);
    console.error('Stack:', e.stack);
  } finally {
    await p.$disconnect();
  }
}

main();
