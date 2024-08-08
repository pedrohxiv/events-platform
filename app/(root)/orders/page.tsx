import { notFound } from "next/navigation";

import { getEventById } from "@/actions/event";
import { getOrdersByEvent } from "@/actions/order";
import { Search } from "@/components/search";
import { formatDateTime, formatPrice } from "@/lib/utils";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const OrdersPage = async ({ searchParams }: Props) => {
  const eventId = (searchParams?.eventId as string) || "";
  const search = (searchParams?.query as string) || "";

  const event = await getEventById(eventId);

  if (!event) {
    return notFound();
  }

  const orders = await getOrdersByEvent({ eventId: event.id, search });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Orders</h3>
      </section>
      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>
      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[200px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] py-3 text-center">
                Event Title
              </th>
              <th className="min-w-[175px] py-3 text-center">Buyer</th>
              <th className="min-w-[100px] py-3 text-center">Created</th>
              <th className="min-w-[125px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="p-regular-14 lg:p-regular-16 border-b"
                  style={{ boxSizing: "border-box" }}
                >
                  <td className="min-w-[200px] py-4 text-left">
                    {order.id}
                  </td>
                  <td className="min-w-[200px] py-4 text-center">
                    {order.event.title}
                  </td>
                  <td className="min-w-[175px] py-4 text-center">
                    {order.buyer.firstName} {order.buyer.lastName}
                  </td>
                  <td className="min-w-[100px] py-4 text-center">
                    {formatDateTime(order.createdAt).dateTime}
                  </td>
                  <td className="min-w-[125px] py-4 text-right">
                    {formatPrice(order.totalAmount!)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default OrdersPage;
