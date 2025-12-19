import { apiClient } from "@/lib/api";
import { Order } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { finishOrderAction } from "@/actions/orders";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderModalProps {
  orderId: string | null;
  onClose: () => Promise<void>;
  token: string;
}

export function OrderModal({ onClose, orderId, token }: OrderModalProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadOrder() {
      try {
        setLoading(true);

        const response = await apiClient<Order>(
          `/order/detail?order_id=${orderId}`,
          {
            method: "GET",
            token: token,
          }
        );

        if (isMounted) {
          setOrder(response);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId, token]);

  const calculateTotal = () => {
    if (!order?.items) return 0;
    return order.items.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
  };

  const handleFinishOrder = async () => {
    if (!orderId) return;

    const result = await finishOrderAction(orderId);

    if (!result.success) {
      console.log(result.error);
    }

    if (result.success) {
      router.refresh();
      onClose();
    }
  };

  return (
    <Dialog
      open={orderId !== null}
      onOpenChange={(open) => {
        if (!open) void onClose();
      }}
    >
      <DialogContent className="bg-app-card text-white p-4 sm:p-6 sm:max-w-xl md:max-w-2xl h-[min(40rem,calc(100dvh-2rem))] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Detalhe do pedido
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-8">
            <p className="text-gray-400">Carregando...</p>
          </div>
        ) : order ? (
          <div className="flex flex-1 flex-col gap-6 min-h-0">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Nome da categoria</p>
                <p className="text-lg font-semibold">Mesa {order.table}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Cliente</p>
                <p className="text-lg font-semibold">
                  {order.name || "Sem nome"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full  font-medium text-xs">
                  Em produção
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col min-h-0">
              <h3 className="text-lg font-semibold mb-3">Itens do pedido</h3>
              <ScrollArea className="flex-1 min-h-0">
                <div className="space-y-3 pr-4">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item) => {
                      const subtotal = item.product.price * item.amount;
                      return (
                        <div
                          key={item.id}
                          className="bg-app-background rounded-lg p-4 border border-app-border"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-base mb-1">
                                {item.product.name}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {item.product.description}
                              </p>
                              <p className="text-sm text-gray-400 mt-2">
                                {formatPrice(item.product.price)} x{" "}
                                {item.amount}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-sm text-gray-400 mb-1">
                                Quantidade: {item.amount}
                              </p>
                              <p className="font-semibold text-lg">
                                Subtotal: {formatPrice(subtotal)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-400 text-center py-4">
                      Nenhum item no pedido
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="border-t border-app-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl sm:text-2xl font-bold text-brand-primary">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter className="shrink-0 gap-3 pt-4 border-t border-app-border">
          <Button
            variant="outline"
            onClick={() => void onClose()}
            className="flex-1 border-app-border hover:bg-transparent bg-transparent text-white hover:text-white"
          >
            Fechar
          </Button>
          <Button
            className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
            disabled={loading}
            onClick={handleFinishOrder}
          >
            Finalizar pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
